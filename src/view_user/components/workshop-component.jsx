import axios from "axios";
import React, { useState, useEffect } from "react";
import PersonSpinner from "./person-spinner-component";
import { useDispatch } from "react-redux";
import WorkshopInfoComponent from "./info-workshop-component";
import { PiUsersLight } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";

export default function WorkshopComponent({ fecha }) {
  const [listworkshop, setlistworkshop] = useState([]);
  const URI = "http://localhost:8000/AllWorkshops";
  const dispatch = useDispatch();

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
    <div>
      {listworkshop.map((list_item, index) => (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div key={index} style={{ flexBasis: "25%", padding: "25px" }}>
              <img
                src="https://todoraquira.com/wp-content/uploads/2020/06/IMG_5570-scaled-e1593288730209.jpg"
                alt="Taller"
                style={{ height: "300px", width: "500px" }}
              />
            </div>
            <div style={{ flexBasis: "15%" }}>
              <h1
                style={{ fontSize: "48px", marginTop: 22, paddingLeft: "50px" }}
              >
                {list_item.name_workshop}
              </h1>
              <hr
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  borderWidth: "1px",
                  color: "#000",
                  paddingLeft: "50px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "24px",
                }}
              >
                <PiUsersLight style={{ width: "25px", height: "25px" }} />
                <p style={{ fontSize: "18px", paddingLeft: "23px" }}>
                  Capacidad <br /> {list_item.capacity_workshop}{" "}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "24px",
                  }}
                >
                  <TfiWorld style={{ width: "25px", height: "25px" }} />
                  <p style={{ fontSize: "18px", paddingLeft: "23px" }}>
                    Idioma <br /> Español
                  </p>
                </div>
              </div>
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
            </div>
            <div
              style={{
                flexBasis: "25%",
                padding: "25px",
                backgroundColor: "white"
              }}
            >
              <label>Desde</label>
              <p style={priceStyle}>${list_item.price_workshop}</p>
              <label>Por persona</label>
              <hr style={lineStyle} />
              <div style={{ flex: 1 }}>
                <strong>Fecha</strong>
                <p>
                  {fecha} {list_item.date_workshop}
                </p>
                <hr style={lineStyle} />
                <strong># Personas</strong>
                <PersonSpinner />
              </div>
              <button className="btn btn-primary" style={buttonStyle}>
                Reservar
              </button>
            </div>
          </div>
          <hr
            style={{
              marginBottom: "10px",
              width: "100%",
              borderWidth: "1px",
              color: "#000",
              paddingLeft: "50px",
            }}
          />
        </>
      ))}
    </div>
  );
}
