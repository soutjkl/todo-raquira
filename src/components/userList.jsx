import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  FormFeedback,
  Col,
  Row,
  Modal,
} from "reactstrap";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
const UserList = () => {
  const [listUsers, setlistUser] = useState([]);
  const [modal, setModal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const URI = "https://comprarte-backend-production.up.railway.app/userAll";
  const dispatch = useDispatch();
  const [selectedValues, setSelectedValues] = useState({});

  const toggle = (selectedUser) => {
    console.log("SELECCIONADO", selectedUser);
    setSelectedValues({
      email: selectedUser.email_user,
      name: selectedUser.user_name,
      lastname: selectedUser.user_lastname,
      rol: selectedUser.user_rol,
    });
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      await axios.get(URI).then(function (res) {
        dispatch(setlistUser(res.data));
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    setMaxPage(Math.ceil(listUsers.length / 10));
  }, [listUsers, dispatch]);

  const deleteUser = async (email_user) => {
    await axios
      .delete(`https://comprarte-backend-production.up.railway.app/delete/${email_user}`)
      .then(function (res) {
        if (res.status === 200) {
          swal({
            title: "Éxito",
            text: "Usuario eliminado",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          getUser();
        }
      })
      .catch(function (err) {
        if (err.response.status >= 400) {
          swal({
            title: "Fallo",
            text: "Usuario no eliminado",
            icon: "error",
            timer: 2000,
          });
        }
      });
  };

  const validate = (values) => {
    const errors = {};

    // We need a valid e-mail
    if (!values.email) errors.email = "Requerido";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
      errors.email = "Email Invalido";

    // We need a valid password
    if (!values.password) errors.password = "Requerido";
    else if (`${values.password}`.length < 5)
      errors.password = "Debe tener 8 caracteres o menos";

    if (!values.name) {
      errors.name = "Requerido";
    } else if (values.name.length > 15) {
      errors.name = "Debe tener 15 caracteres o menos";
    }
    if (!values.lastname) {
      errors.lastname = "Requerido";
    } else if (values.lastname.length > 15) {
      errors.lastname = "Debe tener 15 caracteres o menos";
    }
    if (!values.rol) {
      errors.rol = "Requerido";
    } else if (values.rol.length < 4) {
      errors.rol = "Debe tener 5 caracteres o menos";
    }
    return errors;
  };

  return (
    <>
      <div
        className="bg text-center"
        style={{
          marginTop: 0,
          padding: 30,
          textAlign: "center",
          marginBottom: 0,
        }}
      >
        <div className="table-responsive">
          <>
            <table
              className="table table-hover table-striped"
              style={{ marginTop: 2, textAlign: "center" }}
            >
              <thead
                className="text-center "
                style={{ backgroundColor: "#e07528" }}
              >
                <tr>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Email
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Nombre
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Apellido
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Tipo de usuario
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {listUsers.map((list_item, index) => {
                  if (
                    index <= currentPage * 10 &&
                    index >= currentPage * 10 - 10
                  ) {
                    return (
                      <tr>
                        <td id="table-cell" key={index}>
                          {list_item.email_user}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.user_name}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.user_lastname}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.user_rol === "Administrador"
                            ? "Administrador"
                            : "Usuario General"}
                        </td>
                        <td
                          id="table-cell"
                          key={index}
                          style={{ marginTop: 2, textAlign: "center" }}
                        >
                          <button
                            className="btn btn-primary mr-2"
                            onClick={() => toggle(list_item)}
                            style={{
                              color: "#D2691E",
                              border: "none",
                              borderRadius: "10px",
                              height: "30px",
                              fontSize: "18px",
                              background: "none",
                            }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteUser(list_item.email_user)}
                            style={{
                              color: "#D2691E",
                              border: "none",
                              borderRadius: "10px",
                              height: "30px",
                              fontSize: "18px",
                              background: "none",
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            <div
              className="pagination position-center botttom-0 float-center"
              style={{ justifyContent: "center" }}
            >
              {currentPage > 1 && (
                <button
                  className="btn btn-primary m-1 "
                  style={{ color: "white" }}
                  id="subtitle"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    disabled={currentPage > 1 ? true : false}
                  />
                </button>
              )}
              <div
                id="text"
                style={{ alignContent: "center", padding: "10px" }}
              >
                {currentPage} de {maxPage}
              </div>
              {currentPage < maxPage && (
                <button
                  className="btn btn-primary m-1"
                  style={{ color: "white" }}
                  id="subtitle"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
            </div>
          </>
        </div>
      </div>

      <Modal
        isOpen={modal}
        toggle={closeModal}
        style={{
          maxWidth: "780px",
          width: "100%",
          position: "fixed",
          top: "25%",
          left: "25%",
        }}
      >
        <Card className="rounded">
          <Formik
            initialValues={{
              email: selectedValues.email || "",
              password: "",
              name: selectedValues.name || "",
              lastname: selectedValues.lastname || "",
              rol: selectedValues.rol || "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await axios
                .put(`https://comprarte-backend-production.up.railway.app/user/${values.email}`, {
                  email_user: values.email,
                  user_name: values.name,
                  user_lastname: values.lastname,
                  user_password: values.password,
                  user_rol: values.rol,
                })
                .then(function (res) {
                  if (res.status === 200) {
                    swal({
                      title: "Exito",
                      text: "Usuario actualizo ",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                    getUser();
                    resetForm();
                  }
                })
                .catch(function (err) {
                  if (err.response.status === 400) {
                    swal({
                      title: "Fallo",
                      text: "Usuario No actualizado ",
                      icon: "error",
                      timer: 2000,
                    });
                  }
                });
            }}
            validate={validate}
          >
            {(props) => {
              const {
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              } = props;
              return (
                <Form
                  onSubmit={handleSubmit}
                  className="mx-5 py-3"
                  style={{ textAlign: "center" }}
                >
                  <h1
                    className="mb-4"
                    id="title"
                    style={{ justifyContent: "center" }}
                  >
                    Editar Usuario
                  </h1>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label id="text" for="email">
                          Email
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          placeholder=""
                          invalid={errors.email && touched.email_user}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          style={{ textAlign: "justify" }}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label id="text" for="password">
                          Contraseña
                        </Label>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Contraseña"
                          invalid={errors.password && touched.user_password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        <FormFeedback>{errors.password}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label id="text" for="name">
                          Nombre
                        </Label>
                        <Input
                          type="name"
                          name="name"
                          placeholder="nombre"
                          invalid={errors.name && touched.user_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label id="text" for="lastname">
                          Apellidos
                        </Label>
                        <Input
                          type="lastname"
                          name="lastname"
                          placeholder="Apellido"
                          invalid={errors.lastname && touched.user_lastname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastname}
                        />
                        <FormFeedback>{errors.lastname}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={5}>
                      <FormGroup>
                        <Label id="text" for="tipo_documento">
                          Rol
                        </Label>
                        <Input
                          id="text"
                          type="select"
                          name="rol"
                          invalid={errors.rol && touched.user_rol}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rol}
                        >
                          <option value={""}>Selecione un valor</option>
                          <option value={"Usuario General"}>Usuario General</option>
   
                          <option value={"Administrador"}>Administrador</option>
                        </Input>
                        <FormFeedback>{errors.rol}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    style={{ color: "white" }}
                    color="#D2691E"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? `Loading` : `Actualizar`}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Modal>
    </>
  );
};

export default UserList;
