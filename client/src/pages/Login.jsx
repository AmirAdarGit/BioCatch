import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/Login.scss';

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
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
