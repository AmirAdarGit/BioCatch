import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import type { ReactElement } from 'react';

function AppLayout(): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const { csid, clearSession } = useSession();
  const isSignedIn = csid !== null;
  const isHome = location.pathname === '/';

  function handleSignOut(): void {
    clearSession();
    navigate('/');
  }

  return (
    <div className={`app-shell ${isSignedIn ? 'app-shell--signed-in' : 'app-shell--signed-out'}`}>
      <header className={`app-header ${isSignedIn ? 'app-header--signed-in' : 'app-header--signed-out'}`}>
        <Link to="/" className="app-logo">
          BioCatch Demo
        </Link>
        <div className="app-header__right">
          <span className="app-status" aria-live="polite">
            {isSignedIn ? (
              <span className="app-status__pill app-status__pill--in">
                Logged in
                <span className="app-status__csid" title={csid ?? undefined}>
                  {csid ? `${csid.slice(0, 8)}…` : ''}
                </span>
              </span>
            ) : (
              <span className="app-status__pill app-status__pill--out">Not logged in</span>
            )}
          </span>
          <nav className="app-nav" aria-label="Main">
              <Link to="/" className="app-nav__link">
                Home
              </Link>
            {isSignedIn ? (
              <>
                <Link to="/account" className="app-nav__link">Account</Link>
                <Link to="/payment" className="app-nav__link">Payment</Link>
                <button type="button" className="app-nav__btn" onClick={handleSignOut}>
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className="app-nav__link app-nav__link--cta">
                Log in
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main role="main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
