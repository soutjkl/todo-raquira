import React, { useState } from 'react'

import axios from 'axios'
import { Formik } from 'formik';
import { Container, Button, Form, FormGroup, Label, Input, Card, FormFeedback, Col, Row } from "reactstrap";
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { setClientData } from '../../features/cotizations/cotizationDataSlice';

export default function ClientDataComponent({ state, setState, setClientCreated }) {

    const URI = "https://comprarte-backend-production.up.railway.app/clients/new-client"
    const URI_SEARCH = "https://comprarte-backend-production.up.railway.app/clients/search/"

    const dispatch = useDispatch()
    const clientData = useSelector(state => state.cotizationData.client)
    const [clientExists, setClientExists] = useState(true)
    const [docType, setDocType] = useState('CC')
    const [docNumber, setDocNumber] = useState('')


    const validate = (values) => {
        const errors = {};

        if (!values.tipo_documento) {
            errors.tipo_documento = 'Campo Requerido';
        }
        if (!values.numero_documento) {
            errors.numero_documento = 'Campo Requerido';
        } else if (values.numero_documento.length >= 30) {
            errors.numero_documento = 'Máximo puede contener 30 caracteres';
        }
        if (!clientExists) {

            if (!values.nombres_cliente) {
                errors.nombres_cliente = 'Campo Requerido';
            } else if (values.nombres_cliente.length >= 50) {
                errors.nombres_cliente = 'Máximo puede contener 50 caracteres';
            }
            if (!values.apellidos_cliente) {
                errors.apellidos_cliente = 'Campo Requerido';
            } else if (values.apellidos_cliente.length >= 50) {
                errors.apellidos_cliente = 'Máximo puede contener 50 caracteres';
            }
            if (!values.email) {
                errors.email = 'Requerido';
            } else if (values.email.length >= 50) {
                errors.email = 'Máximo puede contener 50 caracteres';
            }
            if (!values.telefono) {
                errors.telefono = 'Requerido';
            } else if (values.telefono.length >= 20) {
                errors.telefono = 'Máximo puede contener 20 caracteres';
            }
        }

        return errors;
    }

    const validateTwo = (values) => {
        const errors = {};
        if (!values.tipo_documento) {
            errors.tipo_documento = 'Campo Requerido';
        }
        if (!values.numero_documento) {
            errors.numero_documento = 'Campo Requerido';
        } else if (values.numero_documento.length >= 30) {
            errors.numero_documento = 'Máximo puede contener 30 caracteres';
        }
        return errors;
    }


    return (
        <>
         { /* {!clientExists && */} 
            <Container id='form' className="pb-5">
                <Card style={{ background: 'none', border: 'none' }}>
                    <Formik
                        initialValues={{
                            nombres_cliente: "",
                            apellidos_cliente: "",
                            tipo_documento: "",
                            numero_documento: "",
                            email: "",
                            telefono: "",
                            estado_cliente: "A",
                        }}
                        onSubmit={async (values) => {
                            if (clientExists) {
                                await axios.post(URI_SEARCH, {
                                    tipo_documento: values.tipo_documento,
                                    numero_documento: values.numero_documento
                                }).then(function (res) {
                                    if (res.status === 200) {
                                        swal({
                                            title: "Cliente ya registrado",
                                            icon: "success",
                                            timer: 2000,
                                        });
                                        setClientCreated(true)
                                        dispatch(setClientData({
                                            id_cliente: res.data.id_client,
                                            nombres_cliente: res.data.nombres_cliente,
                                            apellidos_cliente: res.data.apellidos_cliente,
                                            tipo_documento: res.data.tipo_documento,
                                            numero_documento: res.data.numero_documento,
                                            telefono: res.data.telefono,
                                            email: res.data.email,
                                            estado_cliente: res.data.estado_cliente
                                        }))
                                    } else if (res.status === 204) {
                                        swal({
                                            title: "Cliente no registrado aún",
                                            icon: "info",
                                            timer: 2000,
                                        });
                                        setDocNumber(values.numero_documento)
                                        setDocType(values.tipo_documento)
                                        setClientCreated(false)
                                        setClientExists(false)

                                    } else {
                                        swal({
                                            title: "Fallo",
                                            text: "Hubo un problema al validar los datos del cliente",
                                            icon: "error",
                                            timer: 2000,
                                        });
                                        setClientExists(false)
                                        setClientCreated(false)
                                    }
                                })

                            } else {
                                await axios.post(URI, {
                                    nombres_cliente: values.nombres_cliente,
                                    apellidos_cliente: values.apellidos_cliente,
                                    tipo_documento: values.tipo_documento,
                                    numero_documento: values.numero_documento,
                                    telefono: values.telefono,
                                    email: values.email,
                                    estado_cliente: values.estado_cliente
                                }).then(function (res) {

                                    if (res.status === 200) {
                                        swal({
                                            title: "Exito",
                                            text: "Cliente Registrado ",
                                            icon: "success",
                                            timer: 2000,
                                        });
                                        setClientCreated(true)
                                        dispatch(setClientData({
                                            id_cliente: res.data.id_client,
                                            nombres_cliente: values.nombres_cliente,
                                            apellidos_cliente: values.apellidos_cliente,
                                            tipo_documento: values.tipo_documento,
                                            numero_documento: values.numero_documento,
                                            telefono: values.telefono,
                                            email: values.email,
                                            estado_cliente: values.estado_cliente
                                        }))
                                    } else {
                                        swal({
                                            title: "Fallo",
                                            text: "Cliente no pudo ser registrado ",
                                            icon: "error",
                                            timer: 2000,
                                        });
                                        setClientCreated(false)
                                    }
                                }
                                )
                            }

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
                                <Form onSubmit={handleSubmit} className="mx-5" style={{ textAlign: 'left' }}>
                                    <h5 className='my-4' id='title'>DATOS DEL CLIENTE</h5>
                                    <Row className='mt-5'>
                                        <Col md={6} style={{width:'400px'}}>
                                            <FormGroup>
                                                <Label id='subtitle' for="tipo_documento" >Tipo de Documento:</Label>
                                                <Input
                                                    id='text'
                                                    type="select"
                                                    name="tipo_documento" 
                                                    invalid={errors.tipo_documento && touched.tipo_documento}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.tipo_documento}
                                                    disabled={!clientExists}
                                                >
                                                    <option value={''}>Seleccione un valor</option>
                                                    <option value={'CC'}>Cédula de Ciudadania</option>
                                                    <option value={'TI'}>Tarjeta de Identidad</option>
                                                    <option value={'CE'}>Cédula de Extranjería</option>
                                                    <option value={'TE'}>Tarjeta de Extranjería</option>
                                                    <option value={'NT'}>NIT</option>
                                                    <option value={'PS'}>Pasaporte</option>
                                                </Input>
                                                <FormFeedback>{errors.tipo_documento}</FormFeedback>
                                            </FormGroup>
                                            {!clientExists &&
                                                <FormGroup >
                                                    <Label id='subtitle' for="nombres_cliente" >
                                                        Nombres:
                                                    </Label>
                                                    <Input
                                                        id='text'
                                                        type="text"
                                                        name="nombres_cliente"
                                                        invalid={errors.nombres_cliente && touched.nombres_cliente}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.nombres_cliente}
                                                        style={{ textAlign: "justify" }}
                                                    />
                                                    <FormFeedback>{errors.nombres_cliente}</FormFeedback>
                                                </FormGroup>
                                            }

                                        </Col>
                                        <Col md={6} style={{width:'400px'}}>
                                            <FormGroup>
                                                <Label id='subtitle' for="numero_documento" >Número de Documento:</Label>
                                                <Input id='text'
                                                    type="text"
                                                    name="numero_documento"
                                                    invalid={errors.numero_documento && touched.numero_documento}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.numero_documento}
                                                    disabled={!clientExists}
                                                />
                                                <FormFeedback>{errors.numero_documento}</FormFeedback>
                                            </FormGroup>
                                            {!clientExists &&
                                                <FormGroup>
                                                    <Label id='subtitle' for="apellidos_cliente" >Apellidos:</Label>
                                                    <Input
                                                        id='text'
                                                        type="text"
                                                        name="apellidos_cliente"
                                                        invalid={errors.apellidos_cliente && touched.apellidos_cliente}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.apellidos_cliente}
                                                    />
                                                    <FormFeedback>{errors.apellidos_cliente}</FormFeedback>
                                                </FormGroup>
                                            }
                                        </Col>
                                        {!clientExists &&
                                            <>
                                                <Col md={6} style={{width:'400px'}}> 
                                                    <FormGroup>
                                                        <Label id='subtitle' for="email" >Correo electrónico:</Label>
                                                        <Input
                                                            id='text'
                                                            type="email"
                                                            name="email"
                                                            invalid={errors.email && touched.email}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.email}
                                                        />
                                                        <FormFeedback>{errors.email}</FormFeedback>
                                                    </FormGroup>

                                                </Col>
                                                <Col md={6} style={{width:'400px'}}>
                                                    <FormGroup>
                                                        <Label id='subtitle' for="telefono" >Teléfono:</Label>
                                                        <Input
                                                            id='text'
                                                            type="phone"
                                                            name="telefono"
                                                            invalid={errors.telefono && touched.telefono}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.telefono}
                                                        />
                                                        <FormFeedback>{errors.telefono}</FormFeedback>
                                                    </FormGroup>
                                                </Col>

                                            </>
                                        }
                                    </Row>
                                    <Row className='text-align-center justify-content-center'>
                                        {!clientExists &&
                                            <Button type='submit' className='btn btn-primary mt-4' style={{ color: 'white', maxWidth: '35%' }} color="#D2691E" disabled={isSubmitting}>
                                                {isSubmitting ? `ENVIANDO...` : `CONTINUAR →`}
                                            </Button>

                                        }
                                        {clientExists &&
                                            <Button type='submit' className='btn btn-primary mt-4' style={{ color: 'white', maxWidth: '35%' }} color="#D2691E" disabled={isSubmitting}>
                                                {isSubmitting ? `ENVIANDO...` : `CONSULTAR →`}
                                            </Button>
                                        }

                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>
                </Card>
            </Container>
       { /* 
       {clientExists &&
        <Container id='form' className="pb-5">
                    <Card style={{ background: 'none', border: 'none' }}>
                        <Formik
                            initialValues={{
                                tipo_documento: "",
                                numero_documento: "",
                            }}
                            onSubmit={async (values) => {
                                await axios.post(URI_SEARCH, {
                                    tipo_documento: values.tipo_documento,
                                    numero_documento: values.numero_documento
                                }).then(function (res) {
                                    if (res.status === 200) {
                                        swal({
                                            title: "Cliente ya registrado",
                                            icon: "success",
                                            timer: 2000,
                                        });
                                        setClientCreated(true)
                                        dispatch(setClientData({
                                            id_cliente: res.data.id_client,
                                            nombres_cliente: res.data.nombres_cliente,
                                            apellidos_cliente: res.data.apellidos_cliente,
                                            tipo_documento: res.data.tipo_documento,
                                            numero_documento: res.data.numero_documento,
                                            telefono: res.data.telefono,
                                            email: res.data.email,
                                            estado_cliente: res.data.estado_cliente
                                        }))
                                    } else if (res.status === 204) {
                                        swal({
                                            title: "Fallo",
                                            text: "No esta registrado",
                                            icon: "error",
                                            timer: 2000,
                                        });
                                        setDocNumber(values.numero_documento)
                                        setDocType(values.tipo_documento)
                                        setClientCreated(false)
                                        setClientExists(false)

                                    } else {
                                        swal({
                                            title: "Fallo",
                                            text: "Hubo un problema al validar los datos del cliente",
                                            icon: "error",
                                            timer: 2000,
                                        });
                                        setClientExists(false)
                                        setClientCreated(false)
                                    }
                                })
                            }}

                            validate={validateTwo}
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
                                    <Form onSubmit={handleSubmit} className="mx-5" style={{ textAlign: 'left' }}>
                                        <h5 className='my-4' id='title'>DATOS DEL CLIENTE</h5>
                                        <Row className='mt-5'>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label id='subtitle' for="tipo_documento" >Tipo de Documento:</Label>
                                                    <Input
                                                        id='text'
                                                        type="select"
                                                        name="tipo_documento"
                                                        // placeholder="nombre"
                                                        invalid={errors.tipo_documento && touched.tipo_documento}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.tipo_documento}
                                                        >
                                                        <option value={'CC'}>Cédula de Ciudadania</option>
                                                        <option value={'TI'}>Tarjeta de Identidad</option>
                                                        <option value={'CE'}>Cédula de Extranjería</option>
                                                        <option value={'TE'}>Tarjeta de Extranjería</option>
                                                        <option value={'NT'}>NIT</option>
                                                        <option value={'PS'}>Pasaporte</option>
                                                    </Input>
                                                    <FormFeedback>{errors.tipo_documento}</FormFeedback>
                                                    </FormGroup>
                                                    
                                            </Col>
                                            <Col md={6}>

                                                <FormGroup>
                                                    <Label id='subtitle' for="numero_documento" >Número de Documento:</Label>
                                                    <Input id='text'
                                                        type="text"
                                                        name="numero_documento"
                                                        // placeholder="Descripcion"
                                                        invalid={errors.numero_documento && touched.numero_documento}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.numero_documento}
                                                    />
                                                    <FormFeedback>{errors.numero_documento}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className='text-align-center justify-content-center'>
                                            <Button type='submit' className='btn btn-primary mt-4' style={{ color: 'white', maxWidth: '35%' }} color="#D2691E" disabled={isSubmitting}>
                                            {isSubmitting ? `ENVIANDO...` : `CONSULTAR →`}
                                            </Button>
                                            
                                        </Row>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Card>
                </Container>
            }
        */ }
        </>
    )
}


