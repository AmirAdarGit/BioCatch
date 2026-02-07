import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/AccountOverview.scss';

function AccountOverview() {
  const navigate = useNavigate();

  function handleLogout() {
    // TODO: clear session, new CSID on next login
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
