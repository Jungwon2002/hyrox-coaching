// Emails the 4-week programme PDF to whoever requested it, and notifies the
// coach of the new lead. Called by the form on program.html.
//
// Sends through Gmail's SMTP as the coach's own account. That choice is
// deliberate: this site has no custom domain, and API services like Resend or
// SendGrid can only authenticate a DOMAIN, which netlify.app cannot provide.
// Authenticating directly with Google sidesteps that entirely — and because
// the mail genuinely originates from Google, SPF, DKIM and DMARC all align,
// which they would not if a third party sent "from" a gmail.com address.
//
// Needs one environment variable in Netlify → Site configuration →
// Environment variables:
//   GMAIL_APP_PASSWORD — a 16-character App Password from
//                        https://myaccount.google.com/apppasswords
//                        (requires 2-Step Verification to be on).
//                        This is NOT the account's normal password.
// Optional:
//   GMAIL_USER         — defaults to the address below.

import nodemailer from "nodemailer";

const COACH = process.env.GMAIL_USER || "coachkimjungwon@gmail.com";
const PDF_PATH = "/assets/hyrox-4-week-programme.pdf";
const SENDER = `HYROX KIM <${COACH}>`;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

// Deliberately permissive — enough to catch a typo, not to police what counts
// as a valid address.
const looksLikeEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

export default async (request) => {
  if (request.method !== "POST") return json(405, { error: "Method not allowed" });

  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) return json(500, { error: "GMAIL_APP_PASSWORD is not set on this site" });

  let name = "";
  let email = "";
  try {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      ({ name = "", email = "" } = await request.json());
    } else {
      const form = await request.formData();
      name = form.get("name") || "";
      email = form.get("email") || "";
    }
  } catch {
    return json(400, { error: "Could not read the submission" });
  }

  name = String(name).trim().slice(0, 100);
  email = String(email).trim().slice(0, 200);
  if (!looksLikeEmail(email)) return json(400, { error: "That email address looks wrong" });

  const origin = new URL(request.url).origin;
  const pdfUrl = origin + PDF_PATH;

  // Pull the PDF once and attach the bytes, rather than letting the mail
  // client fetch a link — an attachment is what was actually promised.
  let pdf;
  try {
    const res = await fetch(pdfUrl);
    if (!res.ok) throw new Error(`PDF fetch returned ${res.status}`);
    pdf = Buffer.from(await res.arrayBuffer());
  } catch (err) {
    return json(502, { error: `Could not read the programme file: ${err.message}` });
  }

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: COACH, pass },
  });

  const greeting = name ? `${escapeHtml(name)}님, ` : "";

  try {
    await transport.sendMail({
      from: SENDER,
      to: email,
      replyTo: COACH,
      subject: "HYROX 4주 프로그램 — HYROX KIM",
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.65;color:#101210">
          <p>${greeting}안녕하세요. HYROX KIM입니다.</p>
          <p>신청해 주신 <strong>HYROX 4주 프로그램</strong>을 첨부해 드립니다.</p>
          <p style="color:#83887b;font-size:13px;margin-top:26px">HYROX KIM · 온라인 코칭</p>
        </div>`,
      attachments: [{ filename: "HYROX-4-Week-Programme.pdf", content: pdf }],
    });
  } catch (err) {
    return json(502, { error: `Gmail refused the send: ${err.message}` });
  }

  // Tell the coach a lead came in. Best effort — the athlete already has their
  // programme, so a failure here must not fail the request.
  try {
    await transport.sendMail({
      from: SENDER,
      to: COACH,
      replyTo: email,
      subject: `[HYROX KIM] 프로그램 신청 — ${name || email}`,
      html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.6">
        <p><strong>4주 프로그램 신청</strong></p>
        <p>이름: ${escapeHtml(name) || "-"}<br>이메일: ${escapeHtml(email)}</p>
        <p style="color:#83887b;font-size:13px">이 메일에 답장하면 신청자에게 바로 전송됩니다.</p>
      </div>`,
    });
  } catch {
    // swallow: the athlete's copy already went out
  }

  return json(200, { sent: true });
};
