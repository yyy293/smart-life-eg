import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // create transporter using Gmail App Password
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMARTLIFE_EMAIL,      // your Gmail
      pass: process.env.SMARTLIFE_PASSWORD,   // Gmail App Password
    },
  });

  const mailOptions = {
    from: process.env.SMARTLIFE_EMAIL,
    to: "smart.life.www@gmail.com",   // your operator approval email
    subject: "New Operator Request",
    text: `A user wants to become an operator: ${email}\n\nAccept or Reject manually.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Request sent to admin email!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
}
