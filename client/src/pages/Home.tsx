import { useEffect, type ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import '../styles/pages/Home.scss';

function Home(): ReactElement {
  const navigate = useNavigate();
  const { csid, clearSession } = useSession();
  const isLoggedIn = csid !== null;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.cdApi?.changeContext) {
      window.cdApi.changeContext('home');
    }
    console.log('[Home] Mounted — context: home');
  }, []);

  function handleLogout(): void {
    clearSession();
    navigate('/');
  }

  return (
    <div className="page page--home">
      <h1>Welcome</h1>
      <p className="page__subtitle">Simulate a user journey: log in, view your account, make a payment, or log out.</p>
      {isLoggedIn ? (
        <button type="button" className="btn btn--secondary page__cta" onClick={handleLogout}>
          Log out
        </button>
      ) : (
        <Link to="/login" className="btn page__cta">Log in</Link>
      )}
    </div>
  );
}

export default Home;
