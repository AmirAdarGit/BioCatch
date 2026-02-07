import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import Home from './pages/Home';
import Login from './pages/Login';
import AccountOverview from './pages/AccountOverview';
import MakePayment from './pages/MakePayment';

function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<AccountOverview />} />
          <Route path="/payment" element={<MakePayment />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;
