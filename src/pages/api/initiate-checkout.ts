import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface MPGSResponse {
  session?: { id: string };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MPGSResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount, orderId, description,carId ,uuid} = req.body;

  if (!amount || !orderId || !description || !carId || !uuid) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }


  const data = {
    apiOperation: 'INITIATE_CHECKOUT',
    checkoutMode: 'WEBSITE',
    interaction: {
      operation: 'PURCHASE',
      merchant: {
        name: 'AL Marjan Rent a Cars',
        url: 'https://marjanuae.vercel.app',
      },
      returnUrl: `https://marjanuae.vercel.app/fleet/${carId}?orderId=${orderId}&uuid=${uuid}`,
    },
    order: {
      currency: 'AED',
      amount: amount.toFixed(2),
      id: uuid,
      description: description,
    },
  };

  console.log('Data',data)

  try {
    const response = await axios.post(
      `https://${process.env.NEXT_PUBLIC_MPGS_REGION}-gateway.mastercard.com/api/rest/version/100/merchant/${process.env.NEXT_PUBLIC_MPGS_MERCHANT_ID}/session`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            `${process.env.MPGS_API_USERNAME}:${process.env.MPGS_API_PASSWORD}`
          ).toString('base64')}`,
        },
      }
    );
  
  
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('MPGS API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || 'Internal Server Error',
    });
  }
  
}
