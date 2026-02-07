import { Link } from 'react-router-dom';

function MakePayment() {
  function handlePayment() {
    // TODO: trigger getScore API
  }

  return (
    <div>
      <h1>Make Payment</h1>
      <p>Complete a payment.</p>
      <button type="button" onClick={handlePayment}>
        Make Payment
      </button>
      <br />
      <Link to="/account">Back to Account</Link>
    </div>
  );
}

export default MakePayment;
