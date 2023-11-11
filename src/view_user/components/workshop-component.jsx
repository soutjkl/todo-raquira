import axios from "axios";
import React, { useState, useEffect } from "react";
import PersonSpinner from "./person-spinner-component";
import { useDispatch } from "react-redux";
import WorkshopInfoComponent from "./info-workshop-component";

export default function WorkshopComponent({ fecha }) {
  const [listworkshop, setlistworkshop] = useState([]);
  const URI = "https://comprarte-backend-production.up.railway.app/AllWorkshops";
  const dispatch = useDispatch();

  const containerStyle2 = {
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
    width: "40%",
  };

  const lineStyle = {
    border: "1px solid #555555",
    margin: "10px 0",
  };
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
  const getlistworkshop = async () => {
    try {
      await axios.get(URI).then(function (res) {
        dispatch(setlistworkshop(res.data));
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getlistworkshop();
  }, []);

  return (
    <div style={containerStyle} className="row">
      {listworkshop.map((list_item, index) => (
        <>
          <div className="col-md-4" key={index}>
            <img
              src="https://todoraquira.com/wp-content/uploads/2020/06/IMG_5570-scaled-e1593288730209.jpg"
              alt="Taller"
              style={{ height: "300px", width: "400px" }}
            />
          </div>
          <div className="col-md-4" key={index}>
            <h2>{list_item.name_workshop}</h2>
            <p>
              <strong style={{ color: "#D2691E" }}> Descripción:</strong>
              <br></br>
              <div
                dangerouslySetInnerHTML={{
                  __html: list_item.description_workshop,
                }}
                className="card-text"
                id="text"
                style={{ maxWidth: "500px", wordBreak: "break-all" }}
              />
            </p>
            <a href={list_item.moreInfoLink}>Más Información</a>
          </div>
          <div key={index}>
        <label>Desde</label>
        <p style={priceStyle}>${list_item.price_workshop}</p>
        <label>Por persona</label>
        <hr style={lineStyle} />
        <div style={{ flex: 1 }}>
          <strong>Fecha</strong>
          <p>{fecha} {list_item.date_workshop}</p>
          <hr style={lineStyle} />
          <strong># Personas</strong>
          <PersonSpinner />
        </div>
        <button className="btn btn-primary" style={buttonStyle}>
          Reservar
        </button>
      </div>
        </>
      ))}
    </div>
  );
}
