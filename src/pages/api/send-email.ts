import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { to, subject, text, html } = req.body;

  // Validate required fields
  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "umunir871@gmail.com", // Replace with your Gmail address
      pass: "qvya kkpt kohj bnnd", // Replace with your app password
    },
  });

  // Define email options
  const mailOptions: nodemailer.SendMailOptions = {
    from: "umunir871@gmail.com", // Replace with your Gmail address
    to,
    subject,
    text,
    html: html || text, // Use HTML if provided, otherwise fallback to plain text
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}