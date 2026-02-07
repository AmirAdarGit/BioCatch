import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext.jsx';
import '../styles/pages/Login.scss';

function Login() {
  const navigate = useNavigate();
  const { csid, setCsid } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.cdApi?.changeContext) {
      window.cdApi.changeContext('login_screen');
    }
  }, []);

  function handleLogin() {
    const sessionId = csid ?? crypto.randomUUID();
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
