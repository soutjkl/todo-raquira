import React from "react";
import WorkshopInfoComponent from "./info-workshop-component";

export default function WorkshopDetailsComponent({ workshopData }) {

  return (
    <div className="workshop-details">
      <div className="workshop-details-column workshop-details-column-first">
        <button className="back-button">← Regresar</button>
        <img src={"imagen"} alt="Taller" className="workshop-image" />
      </div>
      <div className="workshop-details-column workshop-details-column-middle">
        <h2 className="workshop-title">{"Título Taller"}</h2>
        <div className="workshop-section">
          <div className="workshop-section-column">
            <i className="fas fa-clock"></i>
            <strong>Duración</strong>
            <label>"Obtener duración"</label>
          </div>
          <div className="workshop-section-column">
            <i className="fas fa-users"></i>
            <strong>Capacidad</strong>
            <label>"Capacidad..."</label>
          </div>
          <div className="workshop-section-column">
            <i className="fas fa-language"></i>
            <strong>Idiomas</strong>
            <label>Español</label>
          </div>
        </div>
        <div className="workshop-section">
          <strong>Descripción:</strong>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, nam sequi. Deserunt omnis at laudantium officia perspiciatis, inventore dolore mollitia sapiente aut voluptatem itaque totam soluta numquam quasi voluptas quo!</p>
        </div>
        <div className="workshop-section">
          <label>Incluido/No Incluido</label>
          <ul>
            <li>No sé</li>
            <li>De dónde vamos</li>
            <li>a sacar lo que va acá</li>
          </ul>
        </div>
      </div>
      <div className="workshop-details-column workshop-details-column-last">
        <WorkshopInfoComponent />
      </div>
    </div>
  );
}
