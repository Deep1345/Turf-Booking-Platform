import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await api.get('/bookings/my-bookings');
                setBookings(res.data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setFetching(false);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    if (loading) return null;
    if (!user) return <Navigate to="/login" />;

    return (
        <div className="container mt-4 animate-fade-in">
            <h1 className="mb-4">My Bookings</h1>
            {fetching ? (
                <div className="text-center text-muted">Loading your past and upcoming bookings...</div>
            ) : bookings.length === 0 ? (
                <div className="glass-panel text-center">
                    <p>You have no active bookings yet.</p>
                </div>
            ) : (
                <div className="grid">
                    {bookings.map(booking => (
                        <div key={booking._id} className="glass-panel" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                            <h3 className="mb-2">{booking.turf?.name || 'Turf Unavailable'}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Location: {booking.turf?.location}</p>
                            <div className="mt-3" style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span>Date:</span>
                                    <strong style={{ color: 'var(--text-main)' }}>{new Date(booking.date).toLocaleDateString()}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Time:</span>
                                    <strong style={{ color: 'var(--text-main)' }}>{booking.timeSlot}</strong>
                                </div>
                            </div>
                            <div className="mt-3 text-center" style={{ color: booking.status === 'confirmed' ? 'var(--accent-primary)' : 'var(--text-muted)'}}>
                                Status: {booking.status.toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
