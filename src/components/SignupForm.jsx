import React from 'react';
import { Field, Formik, useFormik } from 'formik';
import { Container, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, FormFeedback, Col, Row } from "reactstrap";
import Menu from './Menu';
import CryptoJS from 'crypto-js';
import Landing from '../view_user/pages/landing-page.jsx';
import { useState, useEffect } from 'react';


const SignupForm = () => {
  const [miLogin, setLogin] = useState("false");
  const [generalUser, setgeneralUser] = useState("false");
  const [emailLists, setEmail] = useState([])

  const desencrypt = (text) => {
    var bytes = CryptoJS.AES.decrypt(text, '@borjascript');
    var textdesencrypt = bytes.toString(CryptoJS.enc.Utf8);
    return textdesencrypt;
  }
  // Haciendo petición al backend
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://comprarte-backend-production.up.railway.app/userAll");
      const data = await response.json();
      setEmail(data);
    }
    fetchData()
  }, [])

  const publicar = (values) => {
    alert(JSON.stringify(values));
    console.log(values.email)
  }

  function logIn(values) {
    emailLists.map(emailList => {
      if (values.email.length === 0) {
        alert("Complete los datos faltantes!!");
      } else {
        if (values.email === emailList.email && values.password === desencrypt(emailList.password) && emailList.rol === "Administrador") {
          setLogin("true");
          document.getElementById("form").style.display = "none";
        } else if (values.email === emailList.email && values.password === desencrypt(emailList.password) && emailList.rol === "Usuario General") {
          setgeneralUser("true");
          document.getElementById("form").style.display = "none";
        }
      }
    })
    console.log(values.email)
  }

  const validar = (values) => {
    const errors = {};

    // We need a valid e-mail
    if (!values.email) errors.email = "Requerido";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
      errors.email = "Email Invalido";

    // We need a valid password
    if (!values.password) errors.password = "Requerido";
    else if (`${values.password}`.length < 5)
      errors.password =
        "La contraseña tiene que tener 7 caracteres";

    console.log({ values, errors });

    return errors;
  }

  return (
    <>
    <Container id='form' className="p-5">
      <Card>
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
                  <Form  onSubmit={handleSubmit} className="mx-5" style={{ textAlign: 'leght' }}>
                    <Row>
                      <Col md={6}>
                        <div className='col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 ' style={{
                          backgroundImage: `url("https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
                          width: "400px", height: "450px", backgroundPosition: 'center'
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
    {(miLogin === "true" && <Menu />) || (generalUser === "true" && <Landing />)}
    </>
  )
}

export default SignupForm