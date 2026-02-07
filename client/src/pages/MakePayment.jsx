import { Link } from 'react-router-dom';
import '../styles/pages/MakePayment.scss';

function MakePayment() {
  function handlePayment() {
    // TODO: trigger getScore API
  }

  return (
    <div className="page page--payment">
      <h1>Make Payment</h1>
      <p>Complete a payment.</p>
      <div className="page__actions">
        <button type="button" className="btn" onClick={handlePayment}>
          Make Payment
        </button>
        <Link to="/account" className="link-block">Back to Account</Link>
      </div>
    </div>
  );
}

export default MakePayment;
