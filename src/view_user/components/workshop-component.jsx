import React from "react";
import WorkshopInfoComponent from "./info-workshop-component";

export default function WorkshopComponent({ workshopData }) {
  const containerStyle = {
    backgroundColor: "white",
    border: "1px solid #4C463D66",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    margin: "0 auto",
  };

  return (
    <div style={containerStyle} className="row">
      <div className="col-md-4">
        <img src={"imagen"} alt="Taller" />
      </div>
      <div className="col-md-4">
        <h2>{"titulo"}</h2>
        <p>
          <strong style={{ color: "#D2691E" }}> Descripción:</strong>
          <br></br>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
          modi! Commodi dolores, error atque nisi officia facilis itaque
          quisquam vero saepe optio illum magni cum excepturi ab officiis
          praesentium deleniti!
        </p>

        <a href="enlaceMasInfo">Más Información</a>
      </div>
      <WorkshopInfoComponent />
    </div>
  );
}
