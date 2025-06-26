import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: "お問い合わせフォーム <onboarding@resend.dev>",
      to: "contact@tkrd-stack.com",
      subject: `お問い合わせ from ${name}`,
      replyTo: email,
      text: message,
    });

    return new Response(JSON.stringify({ status: "success", data }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", error }), {
      status: 500,
    });
  }
}
