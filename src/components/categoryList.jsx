import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare,faArrowRight,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
  ModalHeader,
} from "reactstrap";
import swal from "sweetalert";
import { useDispatch } from "react-redux";

const CategoryList = () => {
  const [listCategory, setlistCategory] = useState([]);
  const [modal, setModal] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const dispatch = useDispatch();
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);

  const toggle = (isNew, categoryId = null) => {
    setModal(!modal);
    setIsNewCategory(isNew);
    setSelectedCategoryId(categoryId);
    if (categoryId) {
      const selectedCategory = listCategory.find(category => category.id_category === categoryId);
      setSelectedCategoryName(selectedCategory ? selectedCategory.name_category : null);
    } else {
      setSelectedCategoryName(null);
    }
    setDataUpdated(!dataUpdated);
  };

  const deleteCategory = async (id) => {
    await axios
      .delete(`https://comprarte-backend-production.up.railway.app/delete-categories/${id}`)
      .then(function (res) {
        if (res.status === 200) {
          swal({
            title: "Éxito",
            text: "Categoria eliminado",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          setDataUpdated(!dataUpdated);
        } else {
          swal({
            title: "Fallo",
            text: "Categoria no eliminado",
            icon: "error",
            timer: 2000,
          });
        }
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name_category) {
      errors.name = "Requerido";
    } else if (values.name_category.length > 20) {
      errors.name = "Debe tener 10 caracteres o menos";
    }
    return errors;
  };
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://comprarte-backend-production.up.railway.app/categoriesAll");
      const data = await response.json();
      setlistCategory(data);
    }
    fetchData();
  }, [dataUpdated]);

  useEffect(() => {
    setMaxPage(Math.ceil(listCategory.length / 10));
  }, [listCategory, dispatch]);

  return (
    <>
      <div className="bg text-center" style={{ marginTop: 20, padding: 20 }}>
        <div className="d-flex justify-content-end ">
          <Button
            onClick={() => toggle(true)}
            type="submit"
            className="btn btn-primary mb-3 mx-5"
            style={{ color: "white" }}
            color="#e07528"
          >
            Agregar
          </Button>
        </div>
        <div className="table-responsive mx-auto">
          <table
            className="table  table-hover table-sm mx-auto"
            style={{ marginTop: 2, textAlign: "center", width: "75rem" }}
          >
            <thead
              className="text-center "
              style={{ backgroundColor: "#e07528" }}
            >
              <tr>
                <th style={{ color: "white" }}>ID</th>
                <th style={{ color: "white" }}>Nombre Categoria</th>
                <th style={{ color: "white" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listCategory.map((listCate, index) => {
              if (
                index <= currentPage * 10 &&
                index >= currentPage * 10 - 10
              ) {
                return (
                  <tr>
                    <td id="table-cell" key={index}>{listCate.id_category}</td>
                    <td id="table-cell" key={index}>{listCate.name_category}</td>
                    <td id="table-cell" key={index} style={{ marginTop: 2, textAlign: "center" }}>
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => toggle(false, listCate.id_category)}
                        style={{
                          color: "#D2691E",
                          border: "none",
                          borderRadius: "10px",
                          height: "35px",
                          fontSize: "18px",
                          background: "none"
                        }}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteCategory(listCate.id_category)}
                        style={{
                          color: "#D2691E",
                          border: "none",
                          borderRadius: "10px",
                          height: "35px",
                          fontSize: "18px",
                          background: "none"
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
        </div>
      </div>

      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{
          maxWidth: "480px",
          width: "100%",
          position: "fixed",
          top: "25%",
          left: "25%",
        }}
      >
        <Card>
          <Formik
            initialValues={{
              id_category: selectedCategoryId,
              name_category: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              if (isNewCategory) {
                await axios.post("https://comprarte-backend-production.up.railway.app/categories/new-categories", {
                  name_category: values.name_category }).then(function (res) {
                    if (res.status === 200) {
                      swal({
                        title: "Éxito",
                        text: "Categoría agregada",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      resetForm();
                    } else {
                      swal({
                        title: "Fallo",
                        text: "Categoría no agregada",
                        icon: "error",
                        timer: 2000,
                      });
                    }
                  });
              } else {
                await axios
                  .put(
                    `https://comprarte-backend-production.up.railway.app/categories/update/${values.id_category}`,
                    {
                      name_category: values.name_category,
                    }
                  ).then(function (res) {
                    if (res.status === 200) {
                      swal({
                        title: "Éxito",
                        text: "Categoría actualizada",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      resetForm();
                    } else {
                      swal({
                        title: "Fallo",
                        text: "Categoría no actualizada",
                        icon: "error",
                        timer: 2000,
                      });
                    }
                  })
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
                <Form
                  onSubmit={handleSubmit}
                  className="mx-5 py-5"
                  style={{ textAlign: "center" }}
                >
                  <Row>
                    <FormGroup>
                      <Label id="subtitle" for="name_category">
                        Nombre categoria
                      </Label>
                      <Input
                        type="name"
                        name="name_category"
                        placeholder="categoria"
                        invalid={
                          errors.name_category && touched.name_category
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name_category || selectedCategoryName || ''}
                      />
                      <FormFeedback>{errors.name_category}</FormFeedback>
                    </FormGroup>
                  </Row>
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    style={{ color: "white" }}
                    color="#D2691E"
                    disabled={isSubmitting}
                  >
                    {selectedCategoryId === null
                      ? isSubmitting
                        ? `Loading`
                        : `Agregar`
                      : isSubmitting
                      ? `Loading`
                      : `Actualizar`}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Modal>
    </>
  );
};

export default CategoryList;
