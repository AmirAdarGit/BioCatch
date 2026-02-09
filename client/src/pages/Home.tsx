import { useEffect, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Home.scss';

function Home(): ReactElement {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.cdApi?.changeContext) {
      window.cdApi.changeContext('home');
    }
    console.log('[Home] Mounted — context: home');
  }, []);

  return (
    <div className="page page--home">
      <h1>Welcome</h1>
      <p className="page__subtitle">Simulate a user journey: log in, view your account, make a payment, or log out.</p>
      <Link to="/login" className="btn page__cta">Log in</Link>
    </div>
  );
}

export default Home;
