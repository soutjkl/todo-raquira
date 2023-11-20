import axios from "axios";
import React, { useState, useEffect } from "react";
import PersonSpinner from "./person-spinner-component";
import { useDispatch } from "react-redux";

export default function WorkshopInfoComponent({ fecha }) {
  const [listworkshop, setlistworkshop] = useState([]);
  const URI = "https://comprarte-backend-production.up.railway.app/AllWorkshops";
  const dispatch = useDispatch();

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
    <div className="col-md-4" style={containerStyle}>
    
  </div>
  );
}
