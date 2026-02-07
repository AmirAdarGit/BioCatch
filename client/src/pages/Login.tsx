import { useEffect, type ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import '../styles/pages/Login.scss';

function Login(): ReactElement {
  const navigate = useNavigate();
  const { csid, setCsid } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.cdApi?.changeContext) {
      window.cdApi.changeContext('login_screen');
    }
    console.log('[Login] Mounted — context: login_screen');
  }, []);

  function handleLogin(): void {
    const sessionId = csid ?? crypto.randomUUID();
    const isNewSession = !csid;
    console.log('[Login] handleLogin —', isNewSession ? 'new CSID' : 'reusing CSID', '→', sessionId);
    if (!csid) setCsid(sessionId);
    if (typeof window !== 'undefined' && window.cdApi?.setCustomerSessionId) {
      window.cdApi.setCustomerSessionId(sessionId);
    }
    // TODO: trigger init API, then navigate
    navigate('/account');
  }

  return (
    <div className="page page--login">
      <h1>Login</h1>
      <p>Sign in to continue.</p>
      <div className="page__actions">
        <button type="button" className="btn" onClick={handleLogin}>
          Login
        </button>
        <Link to="/" className="link-block">Back to Home</Link>
      </div>
    </div>
  );
}

export default Login;
