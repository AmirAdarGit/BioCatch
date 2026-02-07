import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import AccountOverview from './pages/AccountOverview.jsx';
import MakePayment from './pages/MakePayment.jsx';

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
