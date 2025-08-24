import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import '../Style_CSS/Stats.css';
import supabase from '../Client';

const Stats = () => {
    const [crewCount, setCrewCount] = useState(0);
    const [crewmates, setCrewmates] = useState([]);

    useEffect(() => {
        async function fetchCrewmates() {
            const { data, error } = await supabase
                .from('CrewMateList')
                .select('id, crew_name, created_at')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching crewmates:', error);
            } else {
                setCrewmates(data);
                setCrewCount(data.length);
            }
        }

        fetchCrewmates();
    }, []);

    return (
        <div className="stats-container">
            <h1>Crewmate Statistics</h1>
            <p>Welcome to the Crewmate Statistics page! Here you can view the total number of crewmates created.</p>
            <Link to="/">
                <button className="create-crew-button">Home</button>
            </Link>
            <div className="stats-info">
                <h2>Total Crewmates Created:</h2>
                <p className="crew-count">{crewCount}</p>
            </div>
            <div className="stats-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crewmates.map((crew) => (
                            <tr key={crew.id}>
                                <td>{crew.id}</td>
                                <td>{crew.crew_name}</td>
                                <td>{new Date(crew.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Stats;