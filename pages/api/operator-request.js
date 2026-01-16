import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMARTLIFE_EMAIL,
      pass: process.env.SMARTLIFE_PASSWORD, // App Password
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMARTLIFE_EMAIL,
      to: "smart.life.www@gmail.com",
      subject: "Operator Request",
      text: `New operator request from: ${email}`,
    });
    res.status(200).json({ message: "Request sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
}
