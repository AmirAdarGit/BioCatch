import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/MakePayment.scss';

function MakePayment() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.cdApi?.changeContext) {
      window.cdApi.changeContext('make_payment');
    }
    console.log('[MakePayment] Mounted — context: make_payment');
  }, []);

  function handlePayment() {
    console.log('[MakePayment] Make Payment clicked');
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
