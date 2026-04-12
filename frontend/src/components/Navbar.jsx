import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';

export default function Navbar({ cartCount, authUser, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <Link to="/" className="logo">Enatega<span>.</span></Link>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            {authUser ? (
              <div className="flex items-center gap-4">
                <span style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Hi, {authUser.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn" style={{ color: 'var(--text-main)', padding: '0.4rem 1rem' }}>Log in</Link>
                <Link to="/signup" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Sign up</Link>
              </div>
            )}
          </div>
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
