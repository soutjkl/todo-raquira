import axios from "axios";
import React, { useState, useEffect } from "react";
import { Field, Formik } from "formik";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  FormFeedback,
} from "reactstrap";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../features/product/productCreateSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Workshop = () => {
  const URI = "https://comprarte-backend-production.up.railway.app/createWorkshop";
  const dispatch = useDispatch();

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
      <Container id="form" className="p-5">
        <Card className="rounded p-2">
          <Formik
            initialValues={{
              name_workshop: "",
              price_workshop: "",
              descripcion: "",
              capacity_workshop: "",
              email_user: "",
              status_workshop: "",
              description_workshop: "",
              date_workshop: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await axios
                .post(URI, {
                  name_workshop: values.name_workshop,
                  price_workshop: values.price_workshop,
                  capacity_workshop: values.capacity_workshop,
                  email_user: values.email_user,
                  status_workshop: values.status_workshop,
                  description_workshop: values.description_workshop,
                  date_workshop: values.date_workshop,
                })
                .then(function (res) {
                  if (res.status === 200) {
                    swal({
                      title: "Éxito",
                      text: "Taller Creado ",
                      icon: "success",
                      timer: 2000,
                    });
                    resetForm();
                    dispatch(setImage(""));
                  }
                })
                .catch(function (err) {
                  console.log("ERRORR---", err);
                  if (err.response.status === 400) {
                    swal({
                      title: "Error interno",
                      text: "No se pudo crear el taller intenta de nuevo ",
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
                    Nuevo Taller
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
                      {isSubmitting ? `Loading` : `Guardar`}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Container>
    </>
  );
};

export default Workshop;
