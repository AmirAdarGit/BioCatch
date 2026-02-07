import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import AccountOverview from './pages/AccountOverview.jsx';
import MakePayment from './pages/MakePayment.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountOverview />} />
        <Route path="/payment" element={<MakePayment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
