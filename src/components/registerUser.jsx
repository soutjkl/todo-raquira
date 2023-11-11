import axios from "axios";
import React from "react";
import { Formik } from "formik";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  FormFeedback,
  Col,
  Row,
} from "reactstrap";
import swal from "sweetalert";

const RegisterUser = () => {
  const URI = "https://comprarte-backend-production.up.railway.app/userCreate";

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = "Requerido";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
      errors.email = "Email Invalido";
    if (!values.password) errors.password = "Requerido";
    else if (`${values.password}`.length < 5)
      errors.password = "Debe tener 8 caracteres o menos";
    if (!values.name) {
      errors.name = "Requerido";
    } else if (values.name.length > 15) {
      errors.name = "Debe tener 15 caracteres o menos";
    }
    if (!values.lastName) {
      errors.lastName = "Requerido";
    } else if (values.lastName.length > 15) {
      errors.lastName = "Debe tener 15 caracteres o menos";
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
      <Container id="form" className="p-5">
        <Card className="rounded p-2">
          <Formik
            initialValues={{
              email: "",
              password: "",
              name: "",
              lastName: "",
              rol: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await axios.post(URI, {
                email_user: values.email,
                user_name: values.name,
                user_lastname: values.lastName,
                user_password: values.password,
                user_rol: values.rol,
                status_user: "A" // Siempre activo por defecto, según tu ejemplo
              }).then(function (res) {
                  console.log("---------------", res.status);
                  if (res.status === 200) {
                    swal({
                      title: "Exito",
                      text: "Usuario Creado ",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                    resetForm();
                  } 
                }).catch(function(err){
                  console.log("ERRORR---", err)
                   if(err.response.status === 400){
                    swal({
                      title: "Fallo",
                      text: "Correo electronico ya registrado",
                      icon: "error",
                      timer: 3000,
                    });
                  }else {
                    swal({
                      title: "Fallo",
                      text: "Usuario No Creado ",
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
                  className="mx-5"
                  onSubmit={handleSubmit}
                >
                  <h2 className="my-4" id="title" style={{ textAlign: "center" }}>Registro de Usuario</h2>

                  <div className="row">
                    <div className="col-6">
                    <FormGroup>
                        <Label id="subtitle" for="email" style={{ textAlign: "start" }}>
                          Correo electrónico:
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="ejample@gmail.com"
                          invalid={errors.email && touched.email}
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
                        <Label id="subtitle" for="password" style={{ textAlign: "start" }}>
                          Contraseña:
                        </Label>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Contraseña"
                          invalid={errors.password && touched.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        <FormFeedback>{errors.password}</FormFeedback>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                    <FormGroup>
                        <Label id="subtitle" for="name" style={{ textAlign: "start" }}>
                          Nombre:
                        </Label>
                        <Input
                          type="name"
                          name="name"
                          placeholder="nombre"
                          invalid={errors.name && touched.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                    <FormGroup>
                        <Label id="subtitle" for="lastName" style={{ textAlign: "start" }}>
                          Apellidos:
                        </Label>
                        <Input
                          type="lastName"
                          name="lastName"
                          placeholder="Apellido"
                          invalid={errors.lastName && touched.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                        />
                        <FormFeedback>{errors.lastName}</FormFeedback>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                    <FormGroup>
                        <Label id="subtitle" for="tipo_documento" style={{ textAlign: "start" }}>
                          Tipo de usuario:
                        </Label>
                        <Input
                          id="text"
                          type="select"
                          name="rol"
                          invalid={errors.rol && touched.rol}
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
                    </div>
                  </div>

                <div className="row justify-content-center my-4">
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    style={{ color: "white", width:'30%'}}
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

export default RegisterUser;
