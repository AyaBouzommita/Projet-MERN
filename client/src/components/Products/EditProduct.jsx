import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editproduct } from "../../redux/productSlice";
import { toast } from "react-toastify";

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
      toast.success("Produit mis à jour avec succès !");
      handleClose();
    } catch (err) {
      toast.error(err || "Erreur de mise à jour");
    }
  };

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow} className="flex-grow-1">
        ✏️ Modifier
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Modifier le Produit</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Nom du produit</Form.Label>
              <Form.Control
                type="text"
                name="nameproduct"
                value={edited.nameproduct}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small">Prix (TND)</Form.Label>
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
                <Form.Label className="fw-semibold small">Catégorie</Form.Label>
                <Form.Select name="category" value={edited.category} onChange={handleChange}>
                  <option value="Informatique">Informatique</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Accessoires">Accessoires</option>
                  <option value="Audio">Audio</option>
                  <option value="Gaming">Gaming</option>
                </Form.Select>
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-md-8">
                <Form.Label className="fw-semibold small">URL de l'image</Form.Label>
                <Form.Control
                  type="text"
                  name="img"
                  value={edited.img}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <Form.Label className="fw-semibold small">Stock</Form.Label>
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
              <Form.Label className="fw-semibold small">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={edited.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Sauvegarder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditProduct;
