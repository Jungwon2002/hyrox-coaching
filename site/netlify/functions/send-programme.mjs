// Emails the 4-week programme PDF to whoever requested it, and notifies the
// coach of the new lead. Called by the form on program.html.
//
// Needs one environment variable set in Netlify → Site configuration →
// Environment variables:
//   RESEND_API_KEY   — from https://resend.com/api-keys
//
// Until a domain is verified at https://resend.com/domains, Resend only
// delivers to the account owner's own address. The sender below falls back to
// Resend's shared onboarding address, which works for testing; set
// PROGRAMME_FROM to something like "HYROX KIM <coach@yourdomain.com>" once the
// domain is verified and it will reach real visitors.

const COACH = "coachkimjungwon@gmail.com";
const PDF_PATH = "/assets/hyrox-4-week-programme.pdf";

const ok = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

const bad = (status, message) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });

// Deliberately permissive — just enough to catch a typo, not to police
// what is a valid address.
const looksLikeEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

export default async (request) => {
  if (request.method !== "POST") return bad(405, "Method not allowed");

  const key = process.env.RESEND_API_KEY;
  if (!key) return bad(500, "RESEND_API_KEY is not set on this site");

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
    return bad(400, "Could not read the submission");
  }

  name = String(name).trim().slice(0, 100);
  email = String(email).trim().slice(0, 200);
  if (!looksLikeEmail(email)) return bad(400, "That email address looks wrong");

  const from = process.env.PROGRAMME_FROM || "HYROX KIM <onboarding@resend.dev>";
  const origin = new URL(request.url).origin;
  const pdfUrl = origin + PDF_PATH;
  const greeting = name ? `${escapeHtml(name)}님, ` : "";

  const send = (payload) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  // 1) the programme itself, to the person who asked for it
  const toAthlete = await send({
    from,
    to: [email],
    reply_to: COACH,
    subject: "HYROX 4주 프로그램 — HYROX KIM",
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.65;color:#101210">
        <p>${greeting}안녕하세요. HYROX KIM입니다.</p>
        <p>신청해 주신 <strong>HYROX 4주 프로그램</strong>을 첨부해 드립니다.
           초급·중급·상급 3가지 레벨과 테이퍼 주간까지 포함되어 있습니다.</p>
        <p>훈련 중 궁금한 점이 있으면 이 메일에 그대로 답장 주세요.</p>
        <p style="margin-top:22px">
          <a href="${pdfUrl}" style="background:#FFE100;color:#101210;text-decoration:none;font-weight:600;padding:11px 20px;border-radius:999px;display:inline-block">
            프로그램 다운로드
          </a>
        </p>
        <p style="color:#83887b;font-size:13px;margin-top:26px">HYROX KIM · 온라인 코칭</p>
      </div>`,
    attachments: [{ filename: "HYROX-4-Week-Programme.pdf", path: pdfUrl }],
  });

  if (!toAthlete.ok) {
    const detail = await toAthlete.text();
    return bad(502, `Resend rejected the send: ${detail.slice(0, 300)}`);
  }

  // 2) tell the coach a lead came in. Best effort — if this fails the athlete
  // still got their programme, so it must not fail the request.
  try {
    await send({
      from,
      to: [COACH],
      reply_to: email,
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

  return ok({ sent: true });
};
