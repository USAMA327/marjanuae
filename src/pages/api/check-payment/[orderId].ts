// pages/api/orders/[orderId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse, AxiosError } from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { orderId } = req.query;
  console.log(orderId)
  if (req.method === 'GET') {
    try {
      const config = {
        method: 'get',
        url: `https://ap-gateway.mastercard.com/api/rest/version/100/merchant/${process.env.NEXT_PUBLIC_MPGS_MERCHANT_ID}/order/${orderId}`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${Buffer.from(
                `${process.env.MPGS_API_USERNAME}:${process.env.MPGS_API_PASSWORD}`
              ).toString('base64')}`,
            },
          
      };

      const response: AxiosResponse = await axios(config);
      res.status(200).json(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      res.status(500).json({ error: axiosError.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}