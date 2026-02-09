import { useEffect, useState, type ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { init as apiInit } from '../api/client';
import '../styles/pages/Login.scss';

function Login(): ReactElement {
  const navigate = useNavigate();
  const { csid, setCsid } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.cdApi?.changeContext) {
      window.cdApi.changeContext('login_screen');
    }
    console.log('[Login] Mounted — context: login_screen');
  }, []);

  async function handleLogin(): Promise<void> {
    const sessionId = csid ?? crypto.randomUUID();
    const isNewSession = !csid;
    console.log('[Login] handleLogin —', isNewSession ? 'new CSID' : 'reusing CSID', '→', sessionId);
    if (!csid) setCsid(sessionId);
    if (typeof window !== 'undefined' && window.cdApi?.setCustomerSessionId) {
      window.cdApi.setCustomerSessionId(sessionId);
    }

    setLoading(true);
    setError(null);
    try {
      const res = await apiInit({
        customerId: 'dummy',
        action: 'init',
        customerSessionId: sessionId,
        activityType: 'LOGIN',
        uuid: crypto.randomUUID(),
        brand: 'SD',
        solution: 'ATO',
        iam: 'mock-user@example.com',
      });
      console.log('[Login] init response:', res);
      navigate('/account');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Init failed';
      setError(msg);
      console.error('[Login] init failed:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page--login">
      <h1>Log in</h1>
      <p className="page__subtitle">Use the button below to trigger the init API and continue to your account.</p>
      {error && <p className="page__error" role="alert">{error}</p>}
      <div className="page__actions">
        <button type="button" className="btn" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
        <Link to="/" className="btn btn--secondary">Back to Home</Link>
      </div>
    </div>
  );
}

export default Login;
