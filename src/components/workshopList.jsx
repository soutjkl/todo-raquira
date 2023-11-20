import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Field, Formik } from "formik";
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
import ReactQuill from "react-quill";

const WorkshopList = () => {
  const [listworkshop, setlistworkshop] = useState([]);
  const [modal, setModal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const URI = "https://comprarte-backend-production.up.railway.app/AllWorkshops";
  const dispatch = useDispatch();
  const [selectedValues, setSelectedValues] = useState({});

  const toggle = (setlistworkshop) => {
    console.log("SELECCIONADO", setlistworkshop);
    setSelectedValues({
      id_workshop: setlistworkshop.id_workshop,
      name_workshop: setlistworkshop.name_workshop,
      price_workshop: setlistworkshop.price_workshop,
      capacity_workshop: setlistworkshop.capacity_workshop,
      email_user: setlistworkshop.email_user,
      status_workshop: setlistworkshop.status_workshop,
      description_workshop: setlistworkshop.description_workshop,
      date_workshop: setlistworkshop.date_workshop,
    });
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    getlistworkshop();
  }, []);

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
    setMaxPage(Math.ceil(listworkshop.length / 10));
  }, [listworkshop, dispatch]);

  const deleteWorkshop = async (id_workshop) => {
    await axios
      .delete(`https://comprarte-backend-production.up.railway.app/deleteWorkshop/${id_workshop}`)
      .then(function (res) {
        if (res.status === 200) {
          swal({
            title: "Éxito",
            text: "Usuario eliminado",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          getlistworkshop();
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
    if (!values.name_workshop) {
      errors.name_workshop = "Requerido";
    } else if (
      values.name_workshop.length > 100 &&
      values.name_workshop.length <= 0
    ) {
      errors.name_workshop = "Debe tener más caracteres";
    }
    if (!values.price_workshop) {
      errors.price_workshop = "Requerido";
    } else if (values.price_workshop.length > 15) {
      errors.price_workshop = "Debe tener 15 caracteres o menos";
    }
    if (
      values.description_workshop &&
      values.description_workshop.length >= 500
    ) {
      errors.description_workshop = "Debe tener 500 caracteres o menos";
    }
    if (!values.status_workshop) {
      errors.status_workshop = "Requerido";
    } else if (values.status_workshop.length < 1) {
      errors.status_workshop = "Debe tener 2 caracteres o menos";
    }
    if (!values.email_user) errors.email_user = "Requerido";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_user)
    )
      errors.email_user = "Email Invalido";
    if (!values.capacity_workshop) {
      errors.capacity_workshop = "Requerido";
    } else if (values.capacity_workshop.length > 15) {
      errors.capacity_workshop = "Debe tener 15 caracteres o menos";
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
                    Id
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
                    Descripción
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Precio
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Capacidad
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Fecha
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Estado
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Email contacto
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
                {listworkshop.map((list_item, index) => {
                  if (
                    index <= currentPage * 10 &&
                    index >= currentPage * 10 - 10
                  ) {
                    return (
                      <tr>
                        <td id="table-cell" key={index}>
                          {list_item.id_workshop}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.name_workshop}
                        </td>
                        <td id="table-cell" key={index}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: list_item.description_workshop,
                            }}
                            className="card-text"
                            id="text"
                            style={{ maxWidth: "500px", wordBreak: "break-all"}}
                          />
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.price_workshop}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.capacity_workshop}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.date_workshop}
                        </td>
                        <td id="table-cell">
                          {list_item.status_workshop === "D"
                            ? "Disponible"
                            : "No disponible"}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.email_user}
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
                            onClick={() =>
                              deleteWorkshop(list_item.id_workshop)
                            }
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
          maxWidth: "900px",
          width: "100%",
          maxHeight: "700px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card className="rounded">
          <Formik
            initialValues={{
              id_workshop: selectedValues.id_workshop || "",
              name_workshop: selectedValues.name_workshop || "",
              price_workshop: selectedValues.price_workshop || "",
              capacity_workshop: selectedValues.capacity_workshop || "",
              email_user: selectedValues.email_user || "",
              status_workshop: selectedValues.status_workshop || "",
              description_workshop: selectedValues.description_workshop || "",
              date_workshop: selectedValues.date_workshop || "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await axios
                .put(
                  `https://comprarte-backend-production.up.railway.app/updateWorkshop/${values.id_workshop}`,
                  {
                    name_workshop: values.name_workshop,
                    price_workshop: values.price_workshop,
                    capacity_workshop: values.capacity_workshop,
                    email_user: values.email_user,
                    status_workshop: values.status_workshop,
                    description_workshop: values.description_workshop,
                    date_workshop: values.date_workshop,
                  }
                )
                .then(function (res) {
                  if (res.status === 200) {
                    swal({
                      title: "Exito",
                      text: "Taller actualizo ",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                    getlistworkshop();
                    resetForm();
                  }
                })
                .catch(function (err) {
                  if (err.response.status === 400) {
                    swal({
                      title: "Fallo",
                      text: "Taller No actualizado ",
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
                <Form onSubmit={handleSubmit} className="mx-5">
                  <h2
                    className="my-4"
                    id="title"
                    style={{ textAlign: "center", padding: 10 }}
                  >
                    Editar Taller
                  </h2>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="name_workshop"
                          style={{ textAlign: "start" }}
                        >
                          Nombre Taller:
                        </Label>
                        <Input
                          type="text"
                          name="name_workshop"
                          placeholder="Nombre"
                          invalid={
                            errors.name_workshop && touched.name_workshop
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name_workshop}
                        />
                        <FormFeedback>{errors.name_workshop}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="price_workshop"
                          style={{ textAlign: "start" }}
                        >
                          Precio:
                        </Label>
                        <Input
                          type="text"
                          name="price_workshop"
                          placeholder="Precio"
                          invalid={
                            errors.price_workshop && touched.price_workshop
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.price_workshop}
                        />
                        <FormFeedback>{errors.price_workshop}</FormFeedback>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="capacity_workshop"
                          style={{ textAlign: "start" }}
                        >
                          Capacidad:
                        </Label>
                        <Input
                          type="text"
                          name="capacity_workshop"
                          placeholder="Capacidad"
                          invalid={
                            errors.capacity_workshop &&
                            touched.capacity_workshop
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.capacity_workshop}
                        />
                        <FormFeedback>{errors.capacity_workshop}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="email_user"
                          style={{ textAlign: "start" }}
                        >
                          Email contacto:
                        </Label>
                        <Input
                          type="text"
                          name="email_user"
                          placeholder="email@mail.com"
                          invalid={errors.email_user && touched.email_user}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email_user}
                        />
                        <FormFeedback>{errors.email_user}</FormFeedback>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="status_workshop"
                          style={{ textAlign: "start" }}
                        >
                          Estado:
                        </Label>
                        <Input
                          id="text"
                          type="select"
                          name="status_workshop"
                          invalid={
                            errors.status_workshop && touched.status_workshop
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.status_workshop}
                        >
                          <option value={"s"}> Seleccione un valor</option>
                          <option value={"D"}> Disponible</option>
                          <option value={"N"}> No disponible</option>
                        </Input>
                        <FormFeedback>{errors.status_workshop}</FormFeedback>
                      </FormGroup>
                    </div>

                    <div className="col-6">
                      <Label
                        id="subtitle"
                        for="description"
                        style={{ textAlign: "start" }}
                      >
                        Fecha:
                      </Label>
                      <Field
                        as={Input}
                        value={values.date_workshop}
                        id="date_workshop"
                        name="date_workshop"
                        variant="filled"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="description"
                          style={{ textAlign: "start" }}
                        >
                          Descripcion:
                        </Label>
                        <Field>
                          {({ field }) => (
                            <ReactQuill
                              {...field}
                              value={values.description_workshop}
                              onChange={handleChange("description_workshop")}
                              onBlur={handleBlur("description_workshop")}
                              name="description_workshop"
                              modules={{
                                toolbar: [
                                  [{ font: [] }],
                                  [{ list: "ordered" }, { list: "bullet" }],
                                  ["bold", "italic", "underline"],
                                  [{ align: [] }],
                                  ["link"],
                                  ["clean"],
                                ],
                              }}
                            />
                          )}
                        </Field>
                        <Label style={{ color: "red" }}>
                          {errors.description_workshop}
                        </Label>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row justify-content-center my-4">
                    <Button
                      type="submit"
                      className="btn btn-primary"
                      style={{ color: "white", width: "30%" }}
                      color="#D2691E"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? `Loading` : `Actualizar`}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Modal>
    </>
  );
};

export default WorkshopList;
