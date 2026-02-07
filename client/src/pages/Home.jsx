import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Home.scss';

function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.cdApi?.changeContext) {
      window.cdApi.changeContext('home');
    }
    console.log('[Home] Mounted — context: home');
  }, []);

  return (
    <div className="page page--home">
      <h1>Home</h1>
      <p>Welcome. Continue to login.</p>
      <Link to="/login" className="btn link-block page__cta">Login</Link>
    </div>
  );
}

export default Home;
