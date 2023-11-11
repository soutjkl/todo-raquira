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

const ClientList = () => {
  const [listClient, setlistClient] = useState([]);
  const [modal, setModal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [selectedValues, setSelectedValues] = useState({});
  const URI = "https://comprarte-backend-production.up.railway.app/cients";
  const dispatch = useDispatch();

  const toggle = (selectedCliente) => {
    setSelectedValues({
      id_cliente: selectedCliente.id_customer,
      nombres_cliente: selectedCliente.name_customer,
      apellidos_cliente: selectedCliente.lastname_customer,
      tipo_documento: selectedCliente.document_type,
      numero_documento: selectedCliente.number_document,
      telefono: selectedCliente.number_phone,
      email: selectedCliente.email_customer,
      estado_cliente: selectedCliente.status_customer,
    });
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    try {
      await axios.get(URI).then(function (res) {
        dispatch(setlistClient(res.data));
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    setMaxPage(Math.ceil(listClient.length / 10));
  }, [listClient, dispatch]);

  const statusClient = async (id) => {
    await axios
      .put(`https://comprarte-backend-production.up.railway.app/clients/update-state/${id}`,{
      estado_cliente: "D",
      }).then(function (res) {
        if (res.status === 200) {
          swal({
            title: "Éxito",
            text: "Cliente Desactivado",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          swal({
            title: "Fallo",
            text: "cliente no desactivado",
            icon: "error",
            timer: 2000,
          });
        }
      });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.tipo_documento) {
      errors.tipo_documento = "Campo Requerido";
    }
    if (!values.numero_documento) {
      errors.numero_documento = "Campo Requerido";
    } else if (values.numero_documento.length >= 30) {
      errors.numero_documento = "Máximo puede contener 30 caracteres";
    }
    if (!values.nombres_cliente) {
      errors.nombres_cliente = "Campo Requerido";
    } else if (values.nombres_cliente.length >= 50) {
      errors.nombres_cliente = "Máximo puede contener 50 caracteres";
    }
    if (!values.apellidos_cliente) {
      errors.apellidos_cliente = "Campo Requerido";
    } else if (values.apellidos_cliente.length >= 50) {
      errors.apellidos_cliente = "Máximo puede contener 50 caracteres";
    }
    if (!values.email) {
      errors.email = "Requerido";
    } else if (values.email.length >= 50) {
      errors.email = "Máximo puede contener 50 caracteres";
    }
    if (!values.telefono) {
      errors.telefono = "Requerido";
    } else if (values.telefono.length >= 20) {
      errors.telefono = "Máximo puede contener 20 caracteres";
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
                    Nombres
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Apellidos
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Tipo Documento
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Numero de Documento
                  </th>
                  <th
                    id="subtitle"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Telefono
                  </th>
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
                    Estado
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
                {listClient.map((list_item, index) => {
                  if (
                    index <= currentPage * 10 &&
                    index >= currentPage * 10 - 10
                  ) {
                    return (
                      <tr>
                        <td id="table-cell" key={index}>
                          {list_item.name_customer}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.lastname_customer}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.document_type}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.number_document}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.number_phone}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.email_customer}
                        </td>
                        <td id="table-cell" key={index}>
                          {list_item.status_customer}
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
                            onClick={() => statusClient(list_item.id_cliente)}
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
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card className="rounded">
          <Formik
            initialValues={{
              id_cliente: selectedValues.id_cliente,
              nombres_cliente: selectedValues.nombres_cliente,
              apellidos_cliente: selectedValues.apellidos_cliente,
              tipo_documento: selectedValues.tipo_documento,
              numero_documento: selectedValues.numero_documento,
              telefono: selectedValues.telefono,
              email: selectedValues.email,
              estado_cliente: selectedValues.estado_cliente,
            }}
            onSubmit={async (values, { resetForm }) => {
              await axios.put(`https://comprarte-backend-production.up.railway.app/clients/update/${values.id_cliente}`, {
                name_customer: values.nombres_cliente,
                lastname_customer: values.apellidos_cliente,
                document_type: values.tipo_documento,
                number_document: values.numero_documento,
                number_phone: values.telefono,
                email_customer: values.email,
                status_customer: values.estado_cliente,
                }).then(function (res) {
                  if (res.status === 200) {
                    swal({
                      title: "Exito",
                      text: "Cliente actualizo ",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                    resetForm();
                  } else {
                    swal({
                      title: "Fallo",
                      text: "Cliente No actualizado ",
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
                  style={{ textAlign: "left" }}
                >
                  <h1
                    className="mb-4 my-4"
                    id="title"
                    style={{ textAlign: "center" }}
                  >
                    Editar Cliente
                  </h1>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label id="text" for="nombres_cliente">
                          Nombres
                        </Label>
                        <Input
                          type="name"
                          name="nombres_cliente"
                          placeholder="nombres"
                          invalid={errors.nombres_cliente && touched.name_customer}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nombres_cliente}
                        />
                        <FormFeedback>{errors.nombres_cliente}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label id="text" for="apellidos_cliente">
                          Apellidos
                        </Label>
                        <Input
                          type="lastName"
                          name="apellidos_cliente"
                          placeholder="Apellido"
                          invalid={errors.apellidos_cliente && touched.lastname_customer}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.apellidos_cliente}
                        />
                        <FormFeedback>{errors.apellidos_cliente}</FormFeedback>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label id="text" for="tipo_documento">
                          Tipo Documento
                        </Label>
                        <Input
                          id="text"
                          type="select"
                          name="tipo_documento"
                          invalid={errors.tipo_documento && touched.document_type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tipo_documento}
                        >
                          <option value={""}>Seleccione un valor</option>
                          <option value={"CC"}>Cédula de Ciudadania</option>
                          <option value={"TI"}>Tarjeta de Identidad</option>
                          <option value={"CE"}>Cédula de Extranjería</option>
                          <option value={"TE"}>Tarjeta de Extranjería</option>
                          <option value={"NT"}>NIT</option>
                          <option value={"PS"}>Pasaporte</option>
                        </Input>
                        <FormFeedback>{errors.tipo_documento}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label id="text" for="email">
                          Numero de Documento
                        </Label>
                        <Input
                          type="number"
                          name="numero_documento"
                          placeholder=""
                          invalid={
                            errors.numero_documento && touched.number_document
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.numero_documento}
                          style={{ textAlign: "justify" }}
                        />
                        <FormFeedback>{errors.numero_documento}</FormFeedback>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label id="text" for="email">
                          Email
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          placeholder=""
                          invalid={errors.email && touched.email_customer}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          style={{ textAlign: "justify" }}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label id="text" for="tipo_documento">
                          Estado
                        </Label>
                        <Input
                          id="text"
                          type="select"
                          name="estado_cliente"
                          invalid={
                            errors.estado_cliente && touched.status_customer
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.estado_cliente}
                        >
                          <option value={""}>Selecione un valor</option>
                          <option value={"A"}>Activo</option>
                          <option value={"D"}>Desactivado</option>
                        </Input>
                        <FormFeedback>{errors.estado_cliente}</FormFeedback>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label id="text" for="email" className="mb-3">
                          Telefono
                        </Label>
                        <Input
                          type="number"
                          name="telefono"
                          placeholder=""
                          invalid={errors.telefono && touched.number_phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.telefono}
                          style={{ textAlign: "justify" }}
                        />
                        <FormFeedback>{errors.telefono}</FormFeedback>
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

export default ClientList;
