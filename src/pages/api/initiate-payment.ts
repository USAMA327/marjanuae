import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    console.log("Received request:", req.body); // Log request body

    const { amount, currency, customer, eInvoiceDetails } = req.body;

    if (!amount || !currency || !customer || !eInvoiceDetails) {
      console.error("Missing required fields in request body");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert auth credentials to Base64
    const authHeader = Buffer.from(
      `${process.env.NEXT_PUBLIC_GEIDEA_API_KEY}:${process.env.NEXT_PUBLIC_GEIDEA_API_PASSWORD}`
    ).toString('base64');

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_GEIDEA_BASE_URL}/payment-intent/api/v1/direct/eInvoice`,
      {
        amount,
        currency,
        customer,
        eInvoiceDetails,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${authHeader}`,
        },
      }
    );

    console.log("Payment response:", response.data);
    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error initiating payment:', error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || 'Failed to initiate payment' });
  }
}
