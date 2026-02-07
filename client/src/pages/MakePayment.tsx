import { useEffect, useState, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { getScore } from '../api/client';
import '../styles/pages/MakePayment.scss';

function MakePayment(): ReactElement {
  const { csid } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ score?: number; request_id: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.cdApi?.changeContext) {
      window.cdApi.changeContext('make_payment');
    }
    console.log('[MakePayment] Mounted — context: make_payment');
  }, []);

  async function handlePayment(): Promise<void> {
    if (!csid) {
      setError('No session. Please log in first.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await getScore({ customerSessionId: csid });
      console.log('[MakePayment] getScore response:', res);
      setResult({ score: res.score, request_id: res.request_id });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'GetScore failed';
      setError(msg);
      console.error('[MakePayment] getScore failed:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page--payment">
      <h1>Make Payment</h1>
      <p>Complete a payment.</p>
      {error && <p className="page__error" style={{ color: 'red' }}>{error}</p>}
      {result && (
        <p className="page__result" style={{ color: 'green' }}>
          Score: {result.score ?? '—'}, request_id: {result.request_id}
        </p>
      )}
      <div className="page__actions">
        <button type="button" className="btn" onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing…' : 'Make Payment'}
        </button>
        <Link to="/account" className="link-block">Back to Account</Link>
      </div>
    </div>
  );
}

export default MakePayment;
