import { useState } from "react";
import HomePage from "./home-page";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LandingPage({ handleLogout }) {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };
  const logOut = () => {
    handleLogout();
    const cajaMenu = document.getElementById("caja_menu");
    const formLogin = document.getElementById("form_login");
    const txtUsu = document.getElementById("txtusu");

    if (cajaMenu) {
      cajaMenu.style.display = "none";
    }
    if (formLogin) {
      formLogin.style.display = "block";
    }
    if (txtUsu) {
      txtUsu.value = " ";
      txtUsu.focus();
    }
  };

  return (
    <div>
      {buttonClicked ? (
        <HomePage landing={setButtonClicked} />
      ) : (
        <div
          className=" container-fluid align-items-center vh-100 row justify-content-center m-0 p-0"
          id="landing-bg"
        >
          <div
            className="card text-center shadow d-flex"
            style={{ width: "50%", height: "60%" }}
            id="landing-card"
          >
            <div className="card-body mx-auto align-items-center row">
              <div>
                <h1 className="card-title mb-4" id="title">
                  BIENVENIDO A ComprArte
                </h1>
                <h5 className="card-text mb-5" id="subtitle">
                  ¡Aquí podras comprobar el costo de tu compra!
                </h5>

                <a
                  className="btn btn-primary"
                  id="btn-cotizar"
                  style={{ color: "white" }}
                  onClick={handleButtonClick}
                >
                  COTIZAR →
                </a>
              </div>
            </div>
          </div>
          <div className="absolute-bottom-right">
            <button
              className="btn btn-outline"
              onClick={logOut}
              style={{ color: "white", fontSize: "24px" }}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
