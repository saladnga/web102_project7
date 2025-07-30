import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import Crew from "../assets/crew.png";

const EditCrewMate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    color: "",
    ability: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const colorOptions = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Black",
    "White",
  ];

  const abilityOptions = [
    "Teleportation",
    "Invisibility",
    "Super Strength",
    "Flying",
    "Time Travel",
    "Mind Reading",
  ];

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const { data, error } = await supabase
          .from("crewmate")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          console.error("Failed fetching crewmate", error);
        }
        setFormData({
          name: data.name || "",
          speed: data.speed || "",
          color: data.color || "",
          ability: data.ability || "",
        });
      } catch (error) {
        console.error("Error fetch crewmate", error);
        alert("Crewmate not found");
        navigate("/gallery");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchCrewmate();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.speed ||
      !formData.color ||
      !formData.ability
    ) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from("crewmate")
        .update(formData)
        .eq("id", id);
      if (error) {
        console.log(error);
      }
      alert("Crewmate updated successfully!");
      navigate(`/crewmate/${id}`);
    } catch (error) {
      console.error("Error updating crewmate", error);
      alert("Error updating crewmate");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this crewmate?")) {
      return;
    }
    try {
      const { error } = await supabase.from("crewmate").delete().eq("id", id);
      if (error) throw error;
      alert("Crewmate deleted successfully");
      navigate("/gallery");
    } catch (error) {
      console.log("Error deleting crewmate", error);
      alert("Error deleting crewmate");
    }
  };

  if (initialLoading) {
    return <div className="loading">Loading crewmate data...</div>;
  }

  return (
    <div className="edit-page">
      <div className="create-center">
        <h1>Update Your Crewmate</h1>
        <div className="crew-image-container">
          <img src={Crew} alt="Crew" className="crew-image" />
        </div>

        <div className="current-info-section">
          <h2 className="current-info-title">Current Crewmate Info:</h2>
          <div className="current-info-display">
            <span className="current-info-text">
              {formData.name || "No name"}, {formData.speed || "No speed"},{" "}
              {formData.color || "No color"}, {formData.ability || "No ability"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-boxes">
            <div className="form-box">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter crewmate name"
                  required
                />
              </div>
            </div>

            <div className="form-box">
              <div className="form-group">
                <label htmlFor="speed">Speed:</label>
                <input
                  type="text"
                  id="speed"
                  name="speed"
                  value={formData.speed}
                  onChange={handleInputChange}
                  placeholder="Enter crewmate speed"
                  required
                />
              </div>
            </div>

            <div className="form-box">
              <div className="form-group">
                <label htmlFor="color">Color:</label>
                <div className="options-grid">
                  {colorOptions.map((color) => (
                    <label key={color} className="option-card">
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={formData.color === color}
                        onChange={handleInputChange}
                      />
                      <span
                        className="color-preview"
                        style={{ backgroundColor: color.toLowerCase() }}
                      ></span>
                      <span className="option-text">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-box">
              <div className="form-group">
                <label htmlFor="ability">Ability:</label>
                <div className="options-grid">
                  {abilityOptions.map((ability) => (
                    <label key={ability} className="option-card">
                      <input
                        type="radio"
                        name="ability"
                        value={ability}
                        checked={formData.ability === ability}
                        onChange={handleInputChange}
                      />
                      <span className="option-text">{ability}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Crewmate"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete Crewmate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCrewMate;
