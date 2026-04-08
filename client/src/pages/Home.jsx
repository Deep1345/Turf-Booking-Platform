import { useState, useEffect } from 'react';
import api from '../utils/api';
import TurfCard from '../components/TurfCard';

const Home = () => {
    const [turfs, setTurfs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTurfs = async () => {
            try {
                const res = await api.get('/turfs');
                setTurfs(res.data);
            } catch (error) {
                console.error("Failed to fetch turfs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTurfs();
    }, []);

    if (loading) return <div className="container mt-4 text-center">Loading turfs...</div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Available Turfs</h1>
            {turfs.length === 0 ? (
                <div className="text-center">No turfs available at the moment.</div>
            ) : (
                <div className="grid">
                    {turfs.map(turf => (
                        <TurfCard key={turf._id} turf={turf} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
