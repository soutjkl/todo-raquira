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

        if (!values.document_type) {
            errors.document_type = 'Campo Requerido';
        }
        if (!values.number_document) {
            errors.number_document = 'Campo Requerido';
        } else if (values.number_document.length >= 30) {
            errors.number_document = 'Máximo puede contener 30 caracteres';
        }
        if (!clientExists) {
            if (!values.name_customer) {
                errors.name_customer = 'Campo Requerido';
            } else if (values.name_customer.length >= 50) {
                errors.name_customer = 'Máximo puede contener 50 caracteres';
            }
            if (!values.lastname_customer) {
                errors.lastname_customer = 'Campo Requerido';
            } else if (values.lastname_customer.length >= 50) {
                errors.lastname_customer = 'Máximo puede contener 50 caracteres';
            }
            if (!values.email_customer) {
                errors.email_customer = 'Requerido';
            } else if (values.email_customer.length >= 50) {
                errors.email_customer = 'Máximo puede contener 50 caracteres';
            }
            if (!values.number_phone) {
                errors.number_phone = 'Requerido';
            } else if (values.number_phone.length >= 20) {
                errors.number_phone = 'Máximo puede contener 20 caracteres';
            }
        }

        return errors;
    }

    const validateTwo = (values) => {
        const errors = {};
        if (!values.document_type) {
            errors.document_type = 'Campo Requerido';
        }
        if (!values.number_document) {
            errors.number_document = 'Campo Requerido';
        } else if (values.number_document.length >= 30) {
            errors.number_document = 'Máximo puede contener 30 caracteres';
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
                            name_customer: "",
                            lastname_customer: "",
                            document_type: "",
                            number_document: "",
                            email_customer: "",
                            number_phone: "",
                            status_customer: "A",
                        }}
                        onSubmit={async (values) => {
                            if (clientExists) {
                                await axios.post(URI_SEARCH, {
                                    document_type: values.document_type,
                                    number_document: values.number_document
                                }).then(function (res) {
                                    if (res.status === 200) {
                                        swal({
                                            title: "Cliente ya registrado",
                                            icon: "success",
                                            timer: 2000,
                                        });
                                        setClientCreated(true)
                                        dispatch(setClientData({
                                            id_customer: res.data.id_customer,
                                            name_customer: res.data.name_customer,
                                            lastname_customer: res.data.lastname_customer,
                                            document_type: res.data.document_type,
                                            number_document: res.data.number_document,
                                            number_phone: res.data.number_phone,
                                            email_customer: res.data.email_customer,
                                            status_customer: res.data.status_customer
                                        }))
                                    } else if (res.status === 204) {
                                        swal({
                                            title: "Cliente no registrado aún",
                                            icon: "info",
                                            timer: 2000,
                                        });
                                        setDocNumber(values.number_document)
                                        setDocType(values.document_type)
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
                                    name_customer: values.name_customer,
                                    lastname_customer: values.lastname_customer,
                                    document_type: values.document_type,
                                    number_document: values.number_document,
                                    number_phone: values.number_phone,
                                    email_customer: values.email_customer,
                                    status_customer: values.status_customer
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
                                            id_customer: res.data.id_client,
                                            name_customer: values.name_customer,
                                            lastname_customer: values.lastname_customer,
                                            document_type: values.document_type,
                                            number_document: values.number_document,
                                            number_phone: values.number_phone,
                                            email: values.email_customer,
                                            status_customer: values.status_customer
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
                                                <Label id='subtitle' for="document_type" >Tipo de Documento:</Label>
                                                <Input
                                                    id='text'
                                                    type="select"
                                                    name="document_type" 
                                                    invalid={errors.document_type && touched.document_type}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.document_type}
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
                                                <FormFeedback>{errors.document_type}</FormFeedback>
                                            </FormGroup>
                                            {!clientExists &&
                                                <FormGroup >
                                                    <Label id='subtitle' for="name_customer" >
                                                        Nombres:
                                                    </Label>
                                                    <Input
                                                        id='text'
                                                        type="text"
                                                        name="name_customer"
                                                        invalid={errors.name_customer && touched.name_customer}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.name_customer}
                                                        style={{ textAlign: "justify" }}
                                                    />
                                                    <FormFeedback>{errors.name_customer}</FormFeedback>
                                                </FormGroup>
                                            }

                                        </Col>
                                        <Col md={6} style={{width:'400px'}}>
                                            <FormGroup>
                                                <Label id='subtitle' for="number_document" >Número de Documento:</Label>
                                                <Input id='text'
                                                    type="text"
                                                    name="number_document"
                                                    invalid={errors.number_document && touched.number_document}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.number_document}
                                                    disabled={!clientExists}
                                                />
                                                <FormFeedback>{errors.number_document}</FormFeedback>
                                            </FormGroup>
                                            {!clientExists &&
                                                <FormGroup>
                                                    <Label id='subtitle' for="lastname_customer" >Apellidos:</Label>
                                                    <Input
                                                        id='text'
                                                        type="text"
                                                        name="lastname_customer"
                                                        invalid={errors.lastname_customer && touched.lastname_customer}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.lastname_customer}
                                                    />
                                                    <FormFeedback>{errors.lastname_customer}</FormFeedback>
                                                </FormGroup>
                                            }
                                        </Col>
                                        {!clientExists &&
                                            <>
                                                <Col md={6} style={{width:'400px'}}> 
                                                    <FormGroup>
                                                        <Label id='subtitle' for="email_customer" >Correo electrónico:</Label>
                                                        <Input
                                                            id='text'
                                                            type="email"
                                                            name="email_customer"
                                                            invalid={errors.email_customer && touched.email_customer}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.email_customer}
                                                        />
                                                        <FormFeedback>{errors.email_customer}</FormFeedback>
                                                    </FormGroup>

                                                </Col>
                                                <Col md={6} style={{width:'400px'}}>
                                                    <FormGroup>
                                                        <Label id='subtitle' for="number_phone" >Teléfono:</Label>
                                                        <Input
                                                            id='text'
                                                            type="phone"
                                                            name="number_phone"
                                                            invalid={errors.number_phone && touched.number_phone}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.number_phone}
                                                        />
                                                        <FormFeedback>{errors.number_phone}</FormFeedback>
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
        </>
    )
}


