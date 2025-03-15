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
      user: process.env.NEXT_PUBLIC_EMAIL, // Replace with your Gmail address
      pass:process.env.NEXT_PUBLIC_PASS, // Replace with your app password
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL, // Replace with your Gmail address
    to: [process.env.EMAIL, to].flat(), // Ensure it's always an array
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