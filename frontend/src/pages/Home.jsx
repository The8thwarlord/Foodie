import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading restaurants...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 700 }}>
        Discover the best <span style={{ color: 'var(--primary-color)' }}>food & drinks</span>
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {restaurants.map(rest => (
          <Link to={`/restaurant/${rest.id}`} key={rest.id}>
            <div className="card">
              <img src={rest.image} alt={rest.name} className="card-img" />
              <div className="card-content">
                <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                  <h2 className="title" style={{ margin: 0 }}>{rest.name}</h2>
                  <div className="flex items-center gap-2" style={{ background: 'var(--bg-color)', padding: '0.2rem 0.5rem', borderRadius: '8px' }}>
                    <Star size={14} color="#f59e0b" fill="#f59e0b" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{rest.rating}</span>
                  </div>
                </div>
                <p className="subtitle">{rest.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
