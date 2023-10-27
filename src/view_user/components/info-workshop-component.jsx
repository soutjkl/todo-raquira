import React from "react";
import PersonSpinner from "./person-spinner-component";

export default function WorkshopInfoComponent({ fecha }) {
  const containerStyle = {
    border: "1px solid #4C463D66",
    padding: "10px",
    backgroundColor: "#yourColor",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  };

  const priceStyle = {
    color: "#D2691E",
    fontSize: "22px",
  };

  const buttonStyle = {
    backgroundColor: "#yourButtonColor",
    color: "white",
    width: "100%",
  };

  const lineStyle = {
    border: "1px solid #555555",
    margin: "10px 0",
  };

  return (
    <div className="col-md-4" style={containerStyle}>
      <div>
        <label>Desde</label>
        <p style={priceStyle}>${"precio"}</p>
        <label>Por persona</label>
      </div>
      <hr style={lineStyle} />
      <div style={{ flex: 1 }}>
        <strong>Fecha</strong>
        <p>{fecha} 18/09/2023</p>
        <hr style={lineStyle} />
        <strong># Personas</strong>
        <PersonSpinner />
      </div>
      <button className="btn btn-primary" style={buttonStyle}>
        Reservar
      </button>
    </div>
  );
}
