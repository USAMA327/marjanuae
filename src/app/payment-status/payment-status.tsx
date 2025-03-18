import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PaymentStatus = () => {
  const router = useRouter();
  const { paymentId, status } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (paymentId && status) {
      setLoading(false);
    }
  }, [paymentId, status]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{status === 'success' ? '✅ Payment Successful' : '❌ Payment Failed'}</h1>
      <p>Payment ID: {paymentId}</p>
      <a href="/fleet">Go back to Fleet</a>
    </div>
  );
};

export default PaymentStatus;
