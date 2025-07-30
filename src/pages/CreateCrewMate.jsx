import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import Crew from "../assets/crew.png";

const CreateCrewMate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    color: "",
    ability: "",
  });

  const [loading, setLoading] = useState(false);

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
      const { data, error } = await supabase
        .from("crewmate")
        .insert([formData])
        .select();
      if (error) throw error;
      alert("Crewmate created successfully!");
      console.log(data);
      navigate("/gallery");
    } catch (error) {
      console.error("Error creating crewmate:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <div className="create-center">
        <h1>Create a new Crewmate</h1>
        <div className="crew-image-container">
          <img src={Crew} alt="Crew" className="crew-image" />
        </div>
        <form onSubmit={handleSubmit} className="create-form">
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
                        id="color"
                        name="color"
                        value={color}
                        checked={formData.color === color}
                        onChange={handleInputChange}
                      />
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
                        id="ability"
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

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Crewmate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCrewMate;
