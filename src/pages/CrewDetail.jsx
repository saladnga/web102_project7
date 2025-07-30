import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const CrewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrewmate();
  });

  const fetchCrewmate = async () => {
    try {
      const { data, error } = await supabase
        .from("crewmate")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setCrewmate(data);
    } catch (error) {
      console.error("Error fetching crewmate:", error);
      alert("Crewmate not found");
      navigate("/gallery");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div className="loading">Loading crewmate details...</div>;
  }

  if (!crewmate) {
    return <div className="error">Crewmate not found</div>;
  }

  return (
    <div className="detail-page">
      <div className="detail-center">
        <div className="detail-card">
          <div className="crewmate-header">
            <h1 className="crewmate-title">Crewmate: {crewmate.name}</h1>
          </div>

          <div className="stats-section">
            <h2 className="stats-title">Stats:</h2>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">Color:</span>
                <span className="stat-value">{crewmate.color}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Speed:</span>
                <span className="stat-value">{crewmate.speed} mph</span>
              </div>
            </div>
          </div>

          <div className="detail-action">
            <Link to={`/edit/${crewmate.id}`} className="btn-edit-detail">
              Wanna edit this crewmate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewDetail;
