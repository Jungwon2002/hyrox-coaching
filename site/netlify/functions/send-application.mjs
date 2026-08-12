// Emails a 1:1 coaching application straight to the coach's inbox.
//
// The application is also recorded in Netlify Forms, which is what the Forms
// dashboard counts. This function exists so the coach does not have to go and
// look: it arrives as normal mail, sent from the coach's own Gmail, with
// replyTo pointing at the applicant so replying answers them directly.
//
// Uses the same GMAIL_APP_PASSWORD environment variable as send-programme.

import nodemailer from "nodemailer";

const COACH = process.env.GMAIL_USER || "coachkimjungwon@gmail.com";
const SENDER = `HYROX KIM <${COACH}>`;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

const looksLikeEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

// Label, form field name — kept in the order the form asks them.
const FIELDS = [
  ["이름 / Name", "name"],
  ["이메일 / Email", "email"],
  ["인스타그램 / Instagram", "instagram"],
  ["필요한 도움 / Needs help with", "help"],
  ["체력 수준 / Fitness level", "fitness"],
  ["목표 대회 / Target race", "race"],
];

export default async (request) => {
  if (request.method !== "POST") return json(405, { error: "Method not allowed" });

  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) return json(500, { error: "GMAIL_APP_PASSWORD is not set on this site" });

  let data;
  try {
    const ct = request.headers.get("content-type") || "";
    data = ct.includes("application/json")
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return json(400, { error: "Could not read the submission" });
  }

  const name = String(data.name || "").trim().slice(0, 100);
  const email = String(data.email || "").trim().slice(0, 200);
  if (!looksLikeEmail(email)) return json(400, { error: "That email address looks wrong" });

  const rows = FIELDS.map(([label, key]) => {
    const value = String(data[key] ?? "").trim();
    return `<tr>
      <td style="padding:7px 16px 7px 0;color:#83887b;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:7px 0;color:#101210"><strong>${escapeHtml(value) || "—"}</strong></td>
    </tr>`;
  }).join("");

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: COACH, pass },
  });

  try {
    await transport.sendMail({
      from: SENDER,
      to: COACH,
      replyTo: email, // replying answers the applicant, not yourself
      subject: `[HYROX KIM] 1:1 코칭 신청 — ${name || email}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.6">
          <p style="font-size:16px;margin:0 0 14px"><strong>1:1 코칭 신청이 접수되었습니다.</strong></p>
          <table style="border-collapse:collapse;font-size:14.5px">${rows}</table>
          <p style="color:#83887b;font-size:13px;margin-top:22px">
            이 메일에 그대로 답장하면 신청자에게 바로 전송됩니다.
          </p>
        </div>`,
    });
  } catch (err) {
    return json(502, { error: `Gmail refused the send: ${err.message}` });
  }

  return json(200, { sent: true });
};
