import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // TODO: trigger init API, then navigate
    navigate('/account');
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Sign in to continue.</p>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Login;
