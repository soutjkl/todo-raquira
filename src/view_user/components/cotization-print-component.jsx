import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PDFDocument } from "pdf-lib";
import swal from "sweetalert";
import { clear } from "../../features/cotizations/cotizationDataSlice";

export default function CotizationPrintComponent({ state, setState }) {
  const cotizationData = useSelector((state) => state.cotizationData);
  const dispatch = useDispatch();
  const URI = "http://localhost:8000/quotes/";

  const printCotization = async () => {
    try {
      await axios.post(URI + "print", cotizationData).then(function (res) {
        console.log(res);
        handlePrint(res.data.base64);
      });
    } catch (error) {
      console.error("Error al imprimir cotización:", error);
    }
  };

  const clearCotizationData = () => {
    dispatch(
      clear({
        customer: {
          id_customer: 0,
          name_customer: "",
          lastname_customer: "",
          document_type: "",
          number_document: "",
          number_phone: "",
          email_customer: "",
        },
        products: [],
        date_quote: "",
        subtotal_quote: 0,
        total_quote: 0,
      })
    );
  };

  const sendEmailCotization = async () => {
    try {
      const res = await axios.post(URI + "sendEmail", cotizationData);
      if (res.status === 200) {
        swal({
          title: "Cotización enviada al correo:",
          text: cotizationData.customer.email_customer,
          icon: "success",
          timer: 3000,
        }).then(() => {
          setState(false);
          clearCotizationData();
        });
      } else {
        swal({
          title: "Error",
          text: "No fue posible enviar el correo, inténtalo de nuevo.",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error al enviar cotización por correo:", error);
    }
  };

  const handlePrint = async (base64) => {
    console.log("Cadena Base64:", base64);
    try {
      const bytes = atob(base64);
      const uint8Array = new Uint8Array(bytes.length);

      for (let i = 0; i < bytes.length; i++) {
        uint8Array[i] = bytes.charCodeAt(i);
      }

      const pdfDoc = await PDFDocument.load(uint8Array);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, "_blank");

      window.onafterprint = function () {
        window.close(blobUrl);
      };
    } catch (error) {
      console.error("Error al decodificar base64:", error);
    }
  };

  return (
    <div className="row align-items-center justify-content-center my-5 py-5 text-center">
      <p id="subtitle" className="mb-4 py-3">
        ¿Cómo prefieres recibir tu cotización?
      </p>
      <div className="col-4 text-center">
        <button
          className="btn btn-primary"
          style={{ color: "white", minWidth: "220px" }}
          onClick={() => {
            sendEmailCotization();
          }}
        >
          {" "}
          ENVIAR POR CORREO →
        </button>
      </div>
      <div className="col-1 text-center" id="subtitle">
        - ó -
      </div>
      <div className="col-4 text-center">
        <button
          className="btn btn-primary"
          style={{ color: "white", minWidth: "220px" }}
          onClick={() => {
            printCotization();
          }}
        >
          {" "}
          IMPRIMIR →
        </button>
      </div>
    </div>
  );
}
