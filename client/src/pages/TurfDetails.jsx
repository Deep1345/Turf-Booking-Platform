import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const TurfDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [turf, setTurf] = useState(null);
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchTurf = async () => {
            try {
                // To fetch a single turf, we filter from the main list. (In MVP)
                const res = await api.get('/turfs');
                const selected = res.data.find(t => t._id === id);
                setTurf(selected);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTurf();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await api.post('/bookings', { turfId: turf._id, date, timeSlot });
            setMessage({ text: 'Booking successful!', type: 'success' });
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Booking failed', type: 'error' });
        }
    };

    if (!turf) return <div className="container mt-4 text-center">Loading turf details...</div>;

    const availableSlots = [
        '09:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '05:00 PM - 06:00 PM',
        '06:00 PM - 07:00 PM',
        '07:00 PM - 08:00 PM'
    ];

    return (
        <div className="container mt-4">
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                <div className="glass-panel animate-fade-in">
                    <div className="turf-image-placeholder mb-4" style={{ borderRadius: '8px' }}>
                        {turf.images && turf.images.length > 0 ? (
                            <img src={turf.images[0]} alt={turf.name} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                        ) : (
                            <span>No Image</span>
                        )}
                    </div>
                    <h2 style={{color: 'var(--accent-primary)'}}>{turf.name}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>{turf.location}</p>
                    <h3 className="mt-2 text-main">${turf.pricePerHour} <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/ hour</span></h3>
                    <p className="mt-3">{turf.description || "A premium turf to play your favorite sports."}</p>
                </div>

                <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <h3 className="mb-4 text-center">Book a Slot</h3>
                    {message.text && (
                        <div style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '8px', background: message.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: message.type === 'success' ? '#10b981' : '#ef4444' }}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleBooking}>
                        <div className="form-group">
                            <label>Pick a Date</label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="form-group">
                            <label>Pick a Time Slot</label>
                            <select value={timeSlot} onChange={e => setTimeSlot(e.target.value)} required>
                                <option value="" disabled>Select a slot</option>
                                {availableSlots.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%' }}>
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TurfDetails;
