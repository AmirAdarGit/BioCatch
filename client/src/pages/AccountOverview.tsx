import { useEffect, type ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import '../styles/pages/AccountOverview.scss';

function AccountOverview(): ReactElement {
  const navigate = useNavigate();
  const { clearSession } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.cdApi?.changeContext) {
      window.cdApi.changeContext('account_overview');
    }
    console.log('[AccountOverview] Mounted — context: account_overview');
  }, []);

  function handleLogout(): void {
    console.log('[AccountOverview] Logout clicked — clearing session');
    clearSession();
    navigate('/');
  }

  return (
    <div className="page page--account">
      <h1>Account overview</h1>
      <p className="page__subtitle">Your account summary. Make a payment or log out.</p>
      <div className="page__actions">
        <Link to="/payment" className="btn">Make payment</Link>
        <button type="button" className="btn btn--secondary" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default AccountOverview;
