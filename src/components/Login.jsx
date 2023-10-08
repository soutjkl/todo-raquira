import React, { useState } from 'react';
import { Formik } from 'formik';
import { Container, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, FormFeedback, Col, Row } from "reactstrap";
import Menu from './Menu';
import Landing from '../view_user/pages/landing-page.jsx';
import { useEffect } from 'react';
import swal from "sweetalert";
import axios from 'axios';

const Login = () => {
  const [miLogin, setLogin] = useState(false);
  const [generalUser, setGeneralUser] = useState(false);
  const [emailLists, setEmail] = useState([]);
  const [authenticated, setAuthenticated] = useState(false)

  const logIn = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/login", values);
      const { token, rol } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", rol);
      if (rol === "admin") {
        setAuthenticated(true);
        setLogin(true)
      }else if(rol === "user"){
        setAuthenticated(true);
        setGeneralUser(true)
      }
    } catch (error) {
      swal({
        title: "Fallo",
        text: "Credenciales incorrectas",
        icon: "error",
        timer: 2000,
      });
    }
  }

  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthenticated(true);
      const role = localStorage.getItem("userRole")
    if(role === 'admin'){
      setLogin(true)
    }else if(role === 'user'){
      setGeneralUser(true)
      }
    }
  };
  
  useEffect(() => {
    checkAuth();
  }, []);

  const validar = (values) => {
    const errors = {};
    if (!values.email) errors.email = "Requerido";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
      errors.email = "Email Invalido";
    if (!values.password) errors.password = "Requerido";
    else if (`${values.password}`.length < 5)
      errors.password = "Debe tener 8 caracteres o menos";
    return errors;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setLogin(false);
    setGeneralUser(false);

  };

  if (miLogin) {
    return (
      <>
        <Menu handleLogout={handleLogout} />
      </>
    );
  } else if (generalUser) {
    return (
      <>
        <Landing handleLogout={handleLogout}/>
      </>
    );
  } else {
    return (
      <>
        <Container id='form' className="p-5" display="flex">
          <Card className="rounded p-2">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={logIn}
              validate={validar}
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
                  /* y otras más */
                } = props;
                return (
                  <Form id='form_login' onSubmit={handleSubmit} className="mx-5" style={{ textAlign: 'center' }}>
                    <Row>
                      <Col md={6}>
                        <div className='col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 ' style={{
                          backgroundImage: `url("https://todoraquira.com/wp-content/uploads/slider2/artesanos2.jpeg")`,
                          width: "550px", height: "500px", backgroundSize:"cover"
                        }}>
                        </div>
                      </Col>
                      <Col md={6}>
                        <h1 id='title' className="my-4" style={{ textAlign: 'center' }}>BIENVENIDO</h1>
                        <FormGroup >
                          <Label id='subtitle' for="email" className="mb-3">
                            Email
                          </Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="contoso@gmail.com"
                            invalid={errors.email && touched.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            style={{ textAlign: "justify" }}
                          />
                          <FormFeedback>{errors.email}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <Label id='subtitle' for="password" >Contraseña</Label>
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
                        <Button type='submit' className='btn btn-primary' style={{ color: 'white' }} color="#D2691E" disabled={isSubmitting}>
                          {isSubmitting ? `Loading` : `Iniciar sesión`}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </Container>
      </>
    );
  }
};

export default Login;
