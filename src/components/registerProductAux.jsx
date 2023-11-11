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

const RegisterProductAux = () => {
  const URI = "https://comprarte-backend-production.up.railway.app/createProduct";
  const productData = useSelector((status) => status.productCreateSlice);
  const dispatch = useDispatch();
  const [listCategory, setlistCategory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://comprarte-backend-production.up.railway.app/categoriesAll");
      const data = await response.json();
      setlistCategory(data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    dispatch(setImage(""));
  }, []);

  const convertBase64 = (archivos) => {
    return new Promise((resolve, reject) => {
      const convertirArchivo = (archivo) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            resolve(img.src);
          };
          reader.onerror = () => {
            reject(new Error("Error al leer el archivo."));
          };
          reader.readAsDataURL(archivo);
        });
      };

      const promesas = Array.from(archivos).map(convertirArchivo);

      Promise.all(promesas)
        .then((resultados) => {
          resolve(resultados);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (selectedFile) {
      if (selectedFile.size > maxSizeInBytes) {
        swal({
          title: "¡Imagen demasiado grande!",
          text: "El tamaño de la imagen no puede superar las 5MB.",
          icon: "error",
          button: "Entendido",
        });
        event.target.value = "";
      } else {
        convertBase64(event.target.files)
          .then((resultados) => {
            const imagen = resultados[0].split(",");
            dispatch(setImage(imagen[1]));
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.categoria) {
      errors.categoria = "Requerido";
    } else if (values.categoria.length < 1) {
      errors.categoria = "Debe tener 15 caracteres o menos";
    }
    if (!values.referencia) {
      errors.referencia = "Requerido";
    } else if (values.referencia.length > 30 && values.referencia.length <= 0) {
      errors.referencia = "Debe tener 8 caracteres o menos";
    }
    if (!values.nombre_Producto) {
      errors.nombre_Producto = "Requerido";
    } else if (
      values.nombre_Producto.length > 100 &&
      values.nombre_Producto.length <= 0
    ) {
      errors.nombre_Producto = "Debe tener más caracteres";
    }
    if (!values.cantidad) {
      errors.cantidad = "Requerido";
    } else if (values.cantidad.length > 15) {
      errors.cantidad = "Debe tener 15 caracteres o menos";
    }
    if (!values.precio_unitario) {
      errors.precio_unitario = "Requerido";
    } else if (values.precio_unitario.length > 15) {
      errors.precio_unitario = "Debe tener 15 caracteres o menos";
    }
    if (!values.estado_producto) {
      errors.estado_producto = "Requerido";
    } else if (values.estado_producto.length < 1) {
      errors.estado_producto = "Debe tener 2 caracteres o menos";
    }
    if (values.descripcion && values.descripcion.length >= 500) {
      errors.descripcion = "Debe tener 500 caracteres o menos";
    }
    return errors;
  };

  return (
    <>
      <Container id="form" className="p-5">
        <Card className="rounded p-2">
          <Formik
            initialValues={{
              categoria: "",
              referencia: "",
              nombre_Producto: "",
              descripcion: "",
              cantidad: "",
              precio_unitario: "",
              estado_producto: "",
              imagen: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await axios
                .post(URI, {
                  id_category: values.categoria,
                  nombre_producto: values.nombre_Producto,
                  descripcion: values.descripcion,
                  cantidad: values.cantidad,
                  referencia_producto: values.referencia,
                  precio_unitario: values.precio_unitario,
                  imagen_producto: productData.imagen,
                  estado: values.estado_producto,
                })
                .then(function (res) {
                  if (res.status === 200) {
                    swal({
                      title: "Éxito",
                      text: "Producto Creado ",
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
                      text: "No se pudo crear el producto intenta de nuevo ",
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
                    Nuevo Producto
                  </h2>

                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="categoria"
                          style={{ textAlign: "start" }}
                        >
                          Categoria:
                        </Label>
                        <Input
                          id="text"
                          type="select"
                          name="categoria"
                          invalid={errors.categoria && touched.categoria}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.categoria}
                        >
                          <option value={"s"}> Seleccione una categoria</option>
                          {listCategory.map((category) => (
                            <option
                              key={category.id_category}
                              value={category.id_category}
                            >
                              {category.name_category}{" "}
                            </option>
                          ))}
                        </Input>
                        <FormFeedback>{errors.categoria}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="referencia"
                          style={{ textAlign: "start" }}
                        >
                          Referencia:
                        </Label>
                        <Input
                          type="text"
                          name="referencia"
                          placeholder="MD122"
                          invalid={errors.referencia && touched.referencia}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.referencia}
                        />
                        <FormFeedback>{errors.referencia}</FormFeedback>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="name"
                          style={{ textAlign: "start" }}
                        >
                          Nombre Producto:
                        </Label>
                        <Input
                          type="text"
                          name="nombre_Producto"
                          placeholder="Nombre"
                          invalid={
                            errors.nombre_Producto && touched.nombre_Producto
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nombre_Producto}
                        />
                        <FormFeedback>{errors.nombre_Producto}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="precio_unitario"
                          style={{ textAlign: "start" }}
                        >
                          Imagen:
                        </Label>
                        <Input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => handleFileChange(e)}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="cantidad"
                          style={{ textAlign: "start" }}
                        >
                          Cantidad:
                        </Label>
                        <Input
                          type="text"
                          name="cantidad"
                          placeholder="Cantidad"
                          invalid={errors.cantidad && touched.cantidad}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cantidad}
                        />
                        <FormFeedback>{errors.cantidad}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="precio_unitario"
                          style={{ textAlign: "start" }}
                        >
                          Precio unitario:
                        </Label>
                        <Input
                          type="text"
                          name="precio_unitario"
                          placeholder="Precio"
                          invalid={
                            errors.precio_unitario && touched.precio_unitario
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.precio_unitario}
                        />
                        <FormFeedback>{errors.precio_unitario}</FormFeedback>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="estado_producto"
                          style={{ textAlign: "start" }}
                        >
                          Estado:
                        </Label>
                        <Input
                          id="text"
                          type="select"
                          name="estado_producto"
                          invalid={
                            errors.estado_producto && touched.estado_producto
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.estado_producto}
                        >
                          <option value={"s"}> Seleccione un valor</option>
                          <option value={"D"}> Disponible</option>
                          <option value={"N"}> No disponible</option>
                        </Input>
                        <FormFeedback>{errors.estado_producto}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="descripcion"
                          style={{ textAlign: "start" }}
                        >
                          Descripcion:
                        </Label>
                        <Field>
                          {({ field }) => (
                            <ReactQuill
                              {...field}
                              value={values.descripcion}
                              onChange={handleChange("descripcion")}
                              onBlur={handleBlur("descripcion")}
                              name="descripcion"
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
                        <Label style={{color:"red"}}>{errors.descripcion}</Label>
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

export default RegisterProductAux;
