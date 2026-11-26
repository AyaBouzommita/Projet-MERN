import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editproduct } from "../../redux/productSlice";
import { toast } from "react-toastify";
import { IconEdit } from "../common/Icons";

function EditProduct({ el }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [edited, setEdited] = useState({
    nameproduct: el?.nameproduct || "",
    price: el?.price || "",
    category: el?.category || "Informatique",
    description: el?.description || "",
    img: el?.img || "",
    countInStock: el?.countInStock || 10,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEdited({
      nameproduct: el?.nameproduct || "",
      price: el?.price || "",
      category: el?.category || "Informatique",
      description: el?.description || "",
      img: el?.img || "",
      countInStock: el?.countInStock || 10,
    });
    setShow(true);
  };

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        editproduct({
          id: el?._id,
          edited: {
            ...edited,
            price: Number(edited.price),
            countInStock: Number(edited.countInStock),
          },
        })
      ).unwrap();
      toast.success("Mise à jour enregistrée");
      handleClose();
    } catch (err) {
      toast.error(err || "Erreur de mise à jour");
    }
  };

  return (
    <>
      <Button variant="light" size="sm" onClick={handleShow} className="btn-outline-pro flex-grow-1 d-flex align-items-center justify-content-center gap-1">
        <IconEdit size={14} />
        <span>Modifier</span>
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold fs-5 text-dark">Modifier la référence</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Nom de l'article</Form.Label>
              <Form.Control
                type="text"
                name="nameproduct"
                value={edited.nameproduct}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Prix unitaire (TND)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={edited.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Catégorie</Form.Label>
                <Form.Select name="category" value={edited.category} onChange={handleChange}>
                  <option value="Informatique">Informatique</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Audio">Audio</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Accessoires">Accessoires</option>
                </Form.Select>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-8">
                <Form.Label className="fw-semibold small text-dark">URL Visuel</Form.Label>
                <Form.Control
                  type="text"
                  name="img"
                  value={edited.img}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <Form.Label className="fw-semibold small text-dark">Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="countInStock"
                  value={edited.countInStock}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>

            <Form.Group className="mb-2">
              <Form.Label className="fw-semibold small text-dark">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={edited.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-top px-4 py-3">
            <Button variant="light" className="btn-outline-pro" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" className="btn-primary-pro">
              Sauvegarder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditProduct;
