import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addproduct } from "../../redux/productSlice";
import { toast } from "react-toastify";

function AddProduct() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    nameproduct: "",
    price: "",
    category: "Informatique",
    description: "",
    img: "",
    countInStock: 10,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.nameproduct || !productData.price) {
      toast.error("Le nom du produit et le prix sont obligatoires !");
      return;
    }

    try {
      await dispatch(
        addproduct({
          ...productData,
          price: Number(productData.price),
          countInStock: Number(productData.countInStock),
        })
      ).unwrap();
      toast.success("Produit ajouté avec succès !");
      setProductData({
        nameproduct: "",
        price: "",
        category: "Informatique",
        description: "",
        img: "",
        countInStock: 10,
      });
      handleClose();
    } catch (err) {
      toast.error(err || "Erreur lors de l'ajout");
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow} className="fw-semibold shadow-sm d-flex align-items-center gap-2">
        <span>➕</span> Ajouter un produit
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Nouveau Produit</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Nom du produit *</Form.Label>
              <Form.Control
                type="text"
                name="nameproduct"
                placeholder="ex: MacBook Pro M3"
                value={productData.nameproduct}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small">Prix (TND) *</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="ex: 3500"
                  value={productData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small">Catégorie</Form.Label>
                <Form.Select name="category" value={productData.category} onChange={handleChange}>
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
                  placeholder="https://..."
                  value={productData.img}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <Form.Label className="fw-semibold small">Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="countInStock"
                  value={productData.countInStock}
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
                placeholder="Description détaillée du produit..."
                value={productData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="warning" type="submit" className="fw-semibold text-dark">
              Enregistrer le produit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddProduct;
