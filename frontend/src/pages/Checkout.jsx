import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cart, cartTotal, authUser }) {
  const [formData, setFormData] = useState({ name: authUser?.name || '', address: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(cart.length === 0) return alert('Cart is empty!');
    if(!authUser) {
      alert('You must be logged in to place an order.');
      navigate('/login');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          items: cart,
          total: cartTotal,
          customerDetails: formData,
        })
      });
      const data = await res.json();
      alert(`Order placed successfully! Order ID: ${data.orderId}`);
      window.location.href = '/';
    } catch(err) {
      console.error(err);
      alert('Error placing order');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 700 }}>Checkout</h1>
      
      <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '3rem', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Delivery Details</h2>
          <form id="checkout-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Full Name" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <textarea 
              placeholder="Delivery Address" 
              rows="4" 
              required
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            ></textarea>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Place Order
            </button>
          </form>
        </div>

        <div className="card" style={{ padding: '1.5rem', height: 'auto' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Order Summary</h2>
          {cart.length === 0 ? (
            <p className="subtitle">Your cart is empty.</p>
          ) : (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <span style={{ color: 'var(--text-muted)' }}>{item.qty}x</span>
                      <span>{item.name}</span>
                    </div>
                    <span style={{ fontWeight: 600 }}>${(Number(item.price) * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>Total</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-color)' }}>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
