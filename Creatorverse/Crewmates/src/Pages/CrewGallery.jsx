import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import "../Style_CSS/CrewGallery.css";
import supabase from "../Client";

const attributeOptions = {
  Color: ["black", "white", "yellow"],
  BodyType: ["offRoad", "classic", "oldschool"],
  Engine: ["V4", "V6", "V8"],
  Tires: ["onRoad", "allTerrain", "mud"],
  Seats: ["2‑seater", "4‑seater", "7‑seater"],
  Size: ["compact", "mid", "full"],
  Model: ["Sport", "Touring", "Luxury"],
};

const CrewGallery = () => {
  const [crews, setCrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const { data, error } = await supabase
          .from("CrewMateList")
          .select("*");

        if (error) {
          throw error;
        }

        setCrews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCrews();
  }, []);

  if (loading) return <div className="crew-gallery"><p>Loading crews...</p></div>;
  if (error) return <div className="crew-gallery"><p>Error: {error}</p></div>;

  return (
    <div className="crew-gallery">
      <Link to="/">
        <button className="back-button">Back to Home</button>
      </Link>
      <h1>Crew Gallery</h1>
      <p>Welcome to the Crew Gallery! Here you can view all the crews you've created.</p>
      <Link to="/createCrew">
        <button className="create-crew-button">Create New Crew</button>
      </Link>

      <div className="crew-cards">
        {crews.map((crew) => (
          <div key={crew.id} className="crew-card">
            <h3>{crew.crew_name}</h3>
            <ul>
              {Object.keys(attributeOptions).map((attr) => {
                // Try different case variations
                const value = crew[attr] || crew[attr.toLowerCase()] || crew[attr.toUpperCase()] || "—";
                return (
                  <li key={attr}>
                    <strong>{attr}:</strong> {value}
                    
                    
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewGallery;