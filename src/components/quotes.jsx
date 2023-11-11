import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Formik } from 'formik';
import { Button, Form, FormGroup, Label, Input, Card, FormFeedback, Col, Row, Modal, ModalHeader } from "reactstrap";
import swal from 'sweetalert';
import { faMagnifyingGlass, faArrowRight, faArrowLeft, } from "@fortawesome/free-solid-svg-icons";

const Quotes = () => {
	const [listQuote, setlistQuote] = useState([]);
	const [modal, setModal] = useState("");
	const toggle = () => {
		setModal(!modal);
	}

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("https://comprarte-backend-production.up.railway.app/quotesAll");
			const data = await response.json();
			setlistQuote(data);
		}
		fetchData()
	}, [])

	const searchQuotes = () => {

	}


	return (
		<div className="container-fluid">
			<div className="row mx-2 mb-1 mt-5">
				<div className="col-9">
					<h1 id="title">COTIZACIONES</h1>
				</div>
				<div className="col-3 justify-contend-end">
					<form class="form-inline py-2 px-5 ">
						<Col className="d-inline-flex ">
							<FormGroup className="mr-2 mb-0">
								<input
									className="form-control me-2"
									type="search"
									placeholder="Numero de cotizacion"
									style={{ background: 'none', border: 'solid 2px', borderColor: 'rgba(76,70,61,0.7)', fontFamily: 'Poppins' }}
									aria-label="Search"
								//   onBlur={searchProducts}
								//   onChange={(e) => {
								//     setStringToSearch(e.target.value)
								//     searchProducts()
								//   }}
								/>
							</FormGroup>
							<button class="btn btn-outline-primary mx-2" type="submit" style={{ border: 'solid 2px', height: '40px' }} onClick={searchQuotes}>
								<FontAwesomeIcon size="lg" icon={faMagnifyingGlass} />
							</button>
						</Col>
					</form>
				</div>
			</div>
			<div className="bg text-center px-3" >
				<div className="table-responsive">
					<>
						<table className="table table-hover table-striped" style={{ marginTop: 2, textAlign: "left" }}>
							<thead className="text-center " style={{ backgroundColor: "#e07528" }}>
								<tr>
									<th id="text" style={{ color: "white" }}>Número de Cotización</th>
									<th id="text" style={{ color: "white" }}>Cliente</th>
									<th id="text" style={{ color: "white" }}>Fecha</th>
									<th id="text" style={{ color: "white" }}>Subtotal</th>
									<th id="text" style={{ color: "white" }}>Total</th>
								</tr>
							</thead>
							<tbody>
								{listQuote.map((list_item, index) => {
									return (
										<tr>
											<td id="table-cell" key={index} style={{ textAlign: 'center' }}>{list_item.numero_cotizacion}</td>
											<td id="table-cell" key={index} style={{ textAlign: 'center' }}>{list_item.datos_cliente.nombres_cliente + ' ' + list_item.datos_cliente.apellidos_cliente}</td>
											<td id="table-cell" key={index} style={{ textAlign: 'center' }}>{list_item.fecha_cotizacion}</td>
											<td id="table-cell" key={index} style={{ textAlign: 'end' }}>${list_item.subtotal.toLocaleString('es-CO')}</td>
											<td id="table-cell" key={index} style={{ textAlign: 'end' }}>${list_item.total.toLocaleString('es-CO')}</td>
										</tr>
									)
								})}

							</tbody>
						</table>
					</>
				</div>
			</div>

			{/* <Modal isOpen={modal} toggle={toggle} style={{ maxWidth: '780px', width: '100%' }}>
				<ModalHeader>
				</ModalHeader>
				<Card>
					<Formik
						initialValues={{
							email: "",
							password: "",
							name: "",
							lastName: "",
							rol: "",
						}}
						onSubmit={async (values, { resetForm }) => {
							await axios.put(`https://comprarte-backend-production.up.railway.app/user/${values.email}`, {
								email: values.email, name: values.name, lastname: values.lastName,
								password: values.password, rol: values.rol
							}).then(function (res) {
								if (res.status === 200) {
									swal({
										title: "Exito",
										text: "Usuario actualizo ",
										icon: "success",
										showConfirmButton: false,
										timer: 2000
									});
									resetForm();
								} else {
									swal({
										title: "Fallo",
										text: "Usuario No actualizado ",
										icon: "error",
										timer: 2000,
									});
								}
							})
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
								<Form onSubmit={handleSubmit} className="mx-5" style={{ textAlign: 'center' }}>
									<img className='img-fluid rounded-pill' src='https://cdn-icons-png.flaticon.com/512/260/260507.png' style={{ width: "80px" }} />
									<Row>
										<Col md={6}>
											<FormGroup >
												<Label id='subtitle' for="email" className="mb-3">
													Email
												</Label>
												<Input
													type="email"
													name="email"
													placeholder=""
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
										</Col>
										<Col md={6}>
											<FormGroup>
												<Label id='subtitle' for="name" >Nombre</Label>
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
											<FormGroup>
												<Label id='subtitle' for="lastName" >Apellidos</Label>
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
										</Col>
										<Col md={2}>
											<FormGroup>
												<Label id='subtitle' for="tipo_documento" >Rol</Label>
												<Input
													id='text'
													type="select"
													name="rol"
													invalid={errors.rol && touched.rol}
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.rol}
												>
													<option value={''}>Selecione un valor</option>
													<option value={'Usuario General'}>Usuario General</option>
													<option value={'Administrador'}>Administrador</option>
												</Input>
												<FormFeedback>{errors.rol}</FormFeedback>
											</FormGroup>
										</Col>
									</Row>
									<Button type='submit' className='btn btn-primary' style={{ color: 'white' }} color="#D2691E" disabled={isSubmitting}>
										{isSubmitting ? `Loading` : `Actualizar`}
									</Button>
								</Form>
							);
						}}
					</Formik>
				</Card>
			</Modal> */}
		</div>
	)
}

export default Quotes
