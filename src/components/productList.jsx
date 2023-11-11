import React, { useState, useEffect } from "react";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
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
import { useDispatch, useSelector } from "react-redux";
import { setImage, setProducts } from "../features/product/productCreateSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";

function ProductList() {
  const [modal, setModal] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const productData = useSelector((status) => status.productCreateSlice);
  const dispatch = useDispatch();
  const URI = "https://comprarte-backend-production.up.railway.app/product";
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const URI_SEARCH = "https://comprarte-backend-production.up.railway.app/searchProducts";
  const [stringToSearch, setStringToSearch] = useState("");
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
    getProduct();
  }, []);

  useEffect(() => {
    setMaxPage(Math.ceil(productData.productos.length / 20));
  }, [productData, dispatch]);

  const getProduct = async () => {
    await axios.get(URI).then(function (res) {
      dispatch(setProducts(res.data));
    });
  };
  
  const toggle = (selectedProduct) => {
    console.log("SELECCIONADO", selectedProduct);
    setSelectedValues({
      id_product: selectedProduct.id_product,
      categoria: selectedProduct.id_category,
      referencia: selectedProduct.product_reference,
      nombre_Producto: selectedProduct.name_product,
      descripcion: selectedProduct.description_product,
      cantidad: selectedProduct.quantity,
      precio_unitario: selectedProduct.unit_price,
      estado_producto: selectedProduct.status_product,
      imagen: "",
    });
    setModal(true);
  };
  
  const closeModal = () => {
    setModal(false);
  };

  const convertBase64 = (archivos) => {
    return new Promise((resolve, reject) => {
      const resultados = [];

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

  const deleteProduct = async (id_product) => {
    await axios
      .put(`https://comprarte-backend-production.up.railway.app/delete-product/${id_product}`)
      .then(function (res) {
        if (res.status === 200) {
          swal({
            title: "Éxito",
            text: "Producto  eliminado",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          getProduct();
        } else {
          swal({
            title: "Fallo",
            text: "No fue posible elimibnar el producto",
            icon: "error",
            timer: 2000,
          });
        }
      });
  };
  const searchProducts = async () => {
    try {
      await axios
        .post(URI_SEARCH, { stringToSearch: stringToSearch })
        .then(function (res) {
          const searchData = res.data;
          dispatch(setProducts(res.data));
          setMaxPage(Math.ceil(searchData.productos.length / 20));
          setCurrentPage(1);
        });
    } catch (error) {
      console.log(error.message);
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
    return errors;
  };
  return (
    <div className="container-fluid">
      <div className="row mx-2 mb-1 mt-5">
        <div className="col-9">
          <h1 id="title">PRODUCTOS</h1>
        </div>
        <div className="col-3 justify-contend-end">
          <form className="form-inline py-2 px-5 ">
            <Col className="d-inline-flex ">
              <FormGroup className="mr-2 mb-0">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar producto..."
                  style={{
                    background: "none",
                    border: "solid 2px",
                    borderColor: "rgba(76,70,61,0.7)",
                    fontFamily: "Poppins",
                  }}
                  aria-label="Search"
                  onBlur={searchProducts}
                  onChange={(e) => {
                    setStringToSearch(e.target.value);
                    searchProducts();
                  }}
                />
              </FormGroup>
              <button
                className="btn btn-outline-primary mx-2"
                type="submit"
                style={{ border: "solid 2px", height: "40px" }}
                onClick={searchProducts}
              >
                <FontAwesomeIcon size="lg" icon={faMagnifyingGlass} />
              </button>
            </Col>
          </form>
        </div>
      </div>
      <div className="bg text-center px-3">
        <div className="table-responsive">
          <>
            <table
              className="table table-hover table-striped"
              style={{ textAlign: "center" }}
            >
              <thead
                className="text-center"
                style={{ backgroundColor: "#e07528" }}
              >
                <tr key='table-header'>
                  <th id="text" key='0' style={{ color: "white" }}>
                    Imagen
                  </th>
                  <th id="text" key='1' style={{ color: "white" }}>
                    Nombre
                  </th>
                  <th id="text" key='2' style={{ color: "white" }}>
                    Referencia
                  </th>
                  <th id="text" key='3' style={{ color: "white" }}>
                    Categoria
                  </th>
                  <th id="text" key='4' style={{ color: "white" }}>
                    Descripción
                  </th>
                  <th id="text" key='5' style={{ color: "white" }}>
                    Cantidad
                  </th>
                  <th id="text" key='6' style={{ color: "white" }}>
                    Precio
                  </th>
                  <th id="text" key='7' style={{ color: "white" }}>
                    Estado
                  </th>
                  <th id="text" key='8' style={{ color: "white" }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {productData.productos.map((list_item, index) => {
                  if (
                    index <= currentPage * 20 &&
                    index >= currentPage * 20 - 20
                  ) {
                    return (
                      <tr key={index}>
                        <td >
                          <img
                            src={list_item.product_picture}
                            alt="Imagen del producto"
                            style={{ width: "40px", maxWidth: "50px" }}
                          />
                        </td>
                        <td id="table-cell">
                          {list_item.name_product}
                        </td>
                        <td id="table-cell" >
                          {list_item.product_reference}
                        </td>
                        <td id="table-cell">
                          {list_item.categoryAssociated.name_category}
                        </td>
                        <td id="table-cell" >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: list_item.description_product,
                            }}
                            className="card-text"
                            id="text"
                            style={{ maxWidth: "500px", wordBreak: "break-all"}}
                          />
                        </td>
                        <td id="table-cell" >
                          {list_item.quantity}
                        </td>
                        <td id="table-cell" >
                          $ {list_item.unit_price.toLocaleString("es-CO")}
                        </td>
                        <td id="table-cell" >
                          {list_item.status_product === "D"
                            ? "Disponible"
                            : "No disponible"}
                        </td>
                        <td
                          style={{ marginTop: 2, textAlign: "center" }}
                        >
                          <button
                            className="btn  mr-2"
                            onClick={() => toggle(list_item)}
                            style={{
                              color: "#D2691E",
                              height: "30px",
                              fontSize: "18px",
                              background: "none",
                            }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteProduct(list_item.id_product)}
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
          maxHeight:"700px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card className="rounded p-2" >
          <Formik
            initialValues={{
              id_product: selectedValues.id_product || "",
              categoria: selectedValues.categoria || "",
              referencia: selectedValues.referencia || "",
              nombre_Producto: selectedValues.nombre_Producto || "",
              descripcion: selectedValues.descripcion || "",
              cantidad: selectedValues.cantidad || "",
              precio_unitario: selectedValues.precio_unitario || "",
              estado_producto: selectedValues.estado_producto,
              imagen: selectedValues.imagen || "",
            }}
            onSubmit={async (values) => {
              await axios
                .put(`https://comprarte-backend-production.up.railway.app/update/${values.id_product}`, {
                  id_category: values.categoria,
                  name_product: values.nombre_Producto,
                  description_product: values.descripcion,
                  quantity: values.cantidad,
                  product_reference: values.referencia,
                  unit_price: values.precio_unitario,
                  product_picture: productData.imagen,
                  status_product: values.estado_producto,
                }).then(function (res) {
                  if (res.status === 200) {
                    swal({
                      title: "Exito",
                      text: "Producto Actualizado",
                      icon: "success",
                      timer: 2000,
                    });
                    getProduct();
                  } 
                }).catch(function(err){
                  console.log("ERRORR---", err)
                   if(err.response.status === 400){
                    swal({
                      title: "Error interno",
                      text: "No se pudo actualizar el producto intenta de nuevo ",
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
                <Form
                  onSubmit={handleSubmit}
                  className="mx-5 py-3"
                  style={{ padding: 20}}
                >
                  <h1
                    className="mb-4"
                    id="title"
                    style={{ textAlign: "center" }}
                  >
                    Editar Producto
                  </h1>
                  <div className="" style={{ padding: 20,maxHeight:'450px', overflowY:'auto' }}>

                  
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="categoria"
                          className=""
                          style={{ textAlign: "start" }}
                        >
                          Categoria
                        </Label>
                        <Input
                          id="text"
                          type="select"
                          name="categoria"
                          invalid={errors.categoria && touched.id_category}
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
                              {category.name_category}
                            </option>
                          ))}
                        </Input>
                        <FormFeedback>{errors.categoria}</FormFeedback>
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label id="subtitle" for="referencia">
                          Referencia
                        </Label>
                        <Input
                          type="text"
                          name="referencia"
                          placeholder="MD122"
                          invalid={errors.referencia && touched.product_reference}
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
                        <Label id="subtitle" for="name">
                          Nombre Producto
                        </Label>
                        <Input
                          type="text"
                          name="nombre_Producto"
                          placeholder="nombre"
                          invalid={
                            errors.nombre_Producto && touched.name_product
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
                        <Label id="subtitle" for="tipo_documento">
                          Estado:
                        </Label>
                        <Input
                          id="text"
                          type="select"
                          name="estado_producto"
                          invalid={
                            errors.estado_producto && touched.status_product
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
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label
                          id="subtitle"
                          for="precio_unitario"
                          style={{ textAlign: "start" }}
                        >
                          Imagen
                        </Label>
                        <Input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => handleFileChange(e)}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-6">
                      <FormGroup>
                        <Label id="subtitle" for="cantidad">
                          Cantidad
                        </Label>
                        <Input
                          type="text"
                          name="cantidad"
                          placeholder="cantidad"
                          invalid={errors.cantidad && touched.quantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cantidad}
                        />
                        <FormFeedback>{errors.cantidad}</FormFeedback>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label id="subtitle" for="precio_unitario">
                          Precio unitario
                        </Label>
                        <Input
                          type="text"
                          name="precio_unitario"
                          placeholder="precio"
                          invalid={
                            errors.precio_unitario && touched.unit_price
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.precio_unitario}
                        />
                        <FormFeedback>{errors.precio_unitario}</FormFeedback>
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
                                clipboard: {
                                  matchVisual: false
                                },
                              }}
                            />
                          )}
                        </Field>
                        <FormFeedback>{errors.descripcion}</FormFeedback>
                      </FormGroup>
                    </div>
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
    </div>
  );
}

export default ProductList;
