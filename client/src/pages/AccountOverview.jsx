import { Link, useNavigate } from 'react-router-dom';

function AccountOverview() {
  const navigate = useNavigate();

  function handleLogout() {
    // TODO: clear session, new CSID on next login
    navigate('/');
  }

  return (
    <div>
      <h1>Account Overview</h1>
      <p>Your account summary.</p>
      <Link to="/payment">Make Payment</Link>
      <br />
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AccountOverview;
