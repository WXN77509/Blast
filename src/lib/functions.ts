let bcrypt: typeof import("bcrypt") | undefined;
let resendInstance: import("resend").Resend | null = null;

async function getBcrypt() {
  if (!bcrypt) {
    bcrypt = await import("bcrypt");
  }
  return bcrypt;
}

async function getResend() {
  if (!resendInstance) {
    const { Resend } = await import("resend");
    resendInstance = new Resend(process.env.RESEND_API_KEY!);
  }
  return resendInstance;
}

export async function sendVerificationEmail({
  user,
  url,
  token
}: {
  user: { email: string; name?: string };
  url: string;
  token: string;
}) {
  try {
    const resend = await getResend();

    const { error } = await resend.emails.send({
      from: "no-reply@yourdomain.com",
      to: user.email,
      subject: "Please verify your email address",
      text: `Hello ${
        user.name ?? "user"
      },\n\nPlease verify your email by clicking this link:\n${url}\n\nThank you!`,
      html: `<p>Hello ${user.name ?? "user"},</p>
             <p>Please verify your email by clicking this link:</p>
             <a href="${url}">${url}</a>
             <p>Thank you!</p>`
    });

    if (error) {
      console.error("Resend error sending email:", error);
    } else {
      console.log("Verification email sent to", user.email);
    }
  } catch (err) {
    console.error("Unexpected error sending verification email:", err);
  } finally {
    console.log(token); // A supprimmer
  }
}

export async function hashPassword(password: string) {
  const bcrypt = await getBcrypt();
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const bcrypt = await getBcrypt();
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Password verification error :", error);
    return false;
  }
}
