import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RestaurantMenu from './pages/RestaurantMenu';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [cart, setCart] = useState([]);
  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthUser(null);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0);

  return (
    <Router>
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} 
        authUser={authUser} 
        handleLogout={handleLogout} 
      />
      <main className="container" style={{ padding: '2rem 1.5rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
          <Route path="/signup" element={<Signup setAuthUser={setAuthUser} />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} cartTotal={cartTotal} authUser={authUser} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
