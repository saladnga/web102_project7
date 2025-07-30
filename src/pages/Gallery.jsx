import React from "react";
import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import { Link } from "react-router-dom";
import Blank from "../assets/blank.png";

const Gallery = () => {
  const [crewmates, setCrewmate] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    try {
      const { data, error } = await supabase
        .from("crewmate")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCrewmate(data || []);
    } catch (error) {
      console.error("Error fetching crewmates:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading Crewmates...</div>;
  }

  return (
    <div className="gallery-page">
      <div className="gallery-center">
        <div className="gallery-header">
          <h1>Your Crewmate Gallery</h1>
        </div>

        {crewmates.length === 0 ? (
          <div className="empty-state">
            <h2>No crewmates yet!</h2>
            <p>Create your first crewmate to get started.</p>
            <br />
            <Link to="/create" className="btn btn-primary">
              Create one here
            </Link>
          </div>
        ) : (
          <div className="crewmates-grid">
            {crewmates.map((crewmate) => (
              <div
                key={crewmate.id}
                className="crewmate-card"
                style={{
                  boxShadow: `0 8px 32px ${
                    crewmate.color?.toLowerCase() || "#ccc"
                  }40`,
                }}
              >
                <div className="crewmate-content">
                  <div className="crewmate-image">
                    <img src={Blank} alt="Crewmate" className="blank-image" />
                  </div>
                  <div className="crewmate-details">
                    <h3 className="crewmate-name">{crewmate.name}</h3>
                    <div className="crewmate-info-item">
                      <span className="info-label">Color:</span>
                      <span className="info-value">{crewmate.color}</span>
                    </div>
                    <div className="crewmate-info-item">
                      <span className="info-label">Speed:</span>
                      <span className="info-value">{crewmate.speed}</span>
                    </div>
                    <div className="crewmate-info-item">
                      <span className="info-label">Ability:</span>
                      <span className="info-value">{crewmate.ability}</span>
                    </div>
                  </div>
                  <div className="crewmate-action">
                    <Link to={`/edit/${crewmate.id}`} className="btn-edit">
                      Edit
                    </Link>
                  </div>{" "}
                  <div className="crewmate-action">
                    <Link to={`/crewmate/${crewmate.id}`} className="btn-edit">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
