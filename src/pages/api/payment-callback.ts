import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Payment Callback Data:', req.body);
    
    // Handle payment success or failure here
    return res.status(200).json({ message: "Callback received" });
  }
  return res.status(405).json({ error: "Method Not Allowed" });
}
