import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addproduct } from "../../redux/productSlice";
import { toast } from "react-toastify";
import { IconPlus } from "../common/Icons";

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
      toast.error("Le nom du produit et le prix sont obligatoires");
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
      toast.success("Produit ajouté avec succès");
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
      toast.error(err || "Erreur lors de l'enregistrement");
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="btn-primary-pro">
        <IconPlus size={16} />
        <span>Ajouter une référence</span>
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold fs-5 text-dark">Nouvelle référence catalogue</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Nom de l'article *</Form.Label>
              <Form.Control
                type="text"
                name="nameproduct"
                placeholder="Ex: Dell XPS 15 9530"
                value={productData.nameproduct}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Prix unitaire (TND) *</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Ex: 4890"
                  value={productData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Catégorie</Form.Label>
                <Form.Select name="category" value={productData.category} onChange={handleChange}>
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
                  placeholder="https://..."
                  value={productData.img}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <Form.Label className="fw-semibold small text-dark">Quantité stock</Form.Label>
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
              <Form.Label className="fw-semibold small text-dark">Fiche technique / Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Détails techniques, processeur, mémoire, connectique..."
                value={productData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-top px-4 py-3">
            <Button variant="light" className="btn-outline-pro" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" className="btn-primary-pro">
              Enregistrer l'article
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddProduct;
