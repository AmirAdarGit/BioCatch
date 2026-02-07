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
      <h1>Account Overview</h1>
      <p>Your account summary.</p>
      <div className="page__actions">
        <Link to="/payment" className="btn link-block">Make Payment</Link>
        <button type="button" className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountOverview;
