import React from "react";
import iconMenu from "../components/img/user.png";
import UserList from "./userList";
import ProductList from "./productList";
import RegisterUser from "./registerUser";
import RegisterProductAux from "./registerProductAux";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import CategoryList from "./categoryList";
import ClientList from "./clientList";
import Quotes from "./quotes";
import Login from "./Login";
import Workshop from "./workshop";
import WorkshopList from "./workshopList";

const Menu = ({ handleLogout }) => {
  function LogOut() {
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
  }

  return (
    <>
      <BrowserRouter>
        <div id="caja_menu" style={{ border: "8px solid #D2691E" }}>
          <nav
            className="navbar navbar-expand-sm navbar-light"
            style={{ backgroundColor: "#D2691E" }}
          >
            <div
              className="container-fluid"
              style={{ backgroundColor: "#D2691E" }}
            >
              <Link className="navbar-brand" to="/home">
                <img src={iconMenu} style={{ width: "52px" }} />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ backgroundColor: "#D2691E" }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
                style={{ backgroundColor: "#D2691E" }}
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtitle"
                      aria-current="page"
                      to="/register"
                      style={{
                        color: "#FFFFF3",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ba5106")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#D2691E")
                      }
                    >
                      Registrar Usuario
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtitle"
                      aria-current="page"
                      to="/list"
                      style={{
                        color: "#FFFFF3",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ba5106")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#D2691E")
                      }
                    >
                      Usuarios
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtitle"
                      aria-current="page"
                      to="/registerProduct"
                      style={{
                        color: "#FFFFF3",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ba5106")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#D2691E")
                      }
                    >
                      Registrar Producto
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtitle"
                      aria-current="page"
                      to="/productos"
                      style={{
                        color: "#FFFFF3",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ba5106")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#D2691E")
                      }
                    >
                      Productos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtitle"
                      aria-current="page"
                      to="/categorias"
                      style={{
                        color: "#FFFFF3",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ba5106")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#D2691E")
                      }
                    >
                      Categorias
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      id="subtitle"
                      className="nav-link active"
                      aria-current="page"
                      to="/cotizaciones"
                      style={{
                        color: "#FFFFF3",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ba5106")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#D2691E")
                      }
                    >
                      Cotizaciones
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    style={{ backgroundColor: "#D2691E" }}
                  >
                    <Link
                      id="subtitle"
                      className="nav-link active"
                      aria-current="page"
                      to="/clientes"
                      style={{
                        color: "#FFFFF3",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ba5106")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#D2691E")
                      }
                    >
                      Clientes
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    style={{ backgroundColor: "#D2691E" }}
                  >
                    <Link
                      id="subtitle"
                      className="nav-link active"
                      aria-current="page"
                      to="/workshops"
                      style={{
                        color: "#FFFFF3",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ba5106")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#D2691E")
                      }
                    >
                      Registro Talleres
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    style={{ backgroundColor: "#D2691E" }}
                  >
                    <Link
                      id="subtitle"
                      className="nav-link active"
                      aria-current="page"
                      to="/AllWorkshops"
                      style={{
                        color: "#FFFFF3",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ba5106")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#D2691E")
                      }
                    >
                      Talleres
                    </Link>
                  </li>
                </ul>
                <span
                  className="navbar-text"
                  style={{ backgroundColor: "#D2691E" }}
                >
                  <button
                    className="btn btn-outline-success"
                    onClick={LogOut}
                    style={{
                      color: "#FFFFF3",
                      textDecoration: "none",
                      transition: "background-color 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "##4C463D")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#fa6b05")
                    }
                    id="subtitle"
                  >
                    Cerrar sesión
                  </button>
                </span>
              </div>
            </div>
          </nav>
        </div>
        <Routes>
          <Route path="/register" element={<RegisterUser />}></Route>
          <Route path="/list" element={<UserList />}></Route>
          <Route
            path="/registerProduct"
            element={<RegisterProductAux />}
          ></Route>
          <Route path="/productos" element={<ProductList />}></Route>
          <Route path="/categorias" element={<CategoryList />}></Route>
          <Route path="/cotizaciones" element={<Quotes />}></Route>
          <Route path="/clientes" element={<ClientList />}></Route>
          <Route path="/workshops" element={<Workshop />}></Route>
          <Route path="/AllWorkshops" element={<WorkshopList />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Menu;
