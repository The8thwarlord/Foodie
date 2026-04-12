import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <Link to="/" className="logo">Foodie.</Link>
        <div className="flex items-center gap-4">
          <Link to="/checkout" className="btn-icon" style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -5,
                right: -5,
                background: 'var(--primary-color)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
