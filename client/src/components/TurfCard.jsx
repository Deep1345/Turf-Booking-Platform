import { Link } from 'react-router-dom';

const TurfCard = ({ turf }) => {
    return (
        <div className="turf-card animate-fade-in">
            <div className="glass-panel">
                <div className="turf-image-placeholder">
                    {turf.images && turf.images.length > 0 ? (
                        <img src={turf.images[0]} alt={turf.name} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                    ) : (
                        <span>No Image Available</span>
                    )}
                </div>
                <div className="turf-content">
                    <h3 className="turf-title">{turf.name}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{turf.location}</p>
                    <div className="turf-price">${turf.pricePerHour} / hour</div>
                    <Link to={`/turfs/${turf._id}`} className="btn" style={{ width: '100%' }}>Book Now</Link>
                </div>
            </div>
        </div>
    );
};

export default TurfCard;
