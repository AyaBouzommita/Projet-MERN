import React, { useState } from "react";
import { Card, Button, Badge, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteproduct } from "../../redux/productSlice";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";

function ProductCard({ el }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteproduct(el?._id)).unwrap();
      toast.success(`Produit "${el?.nameproduct}" supprimé !`);
    } catch (err) {
      toast.error(err || "Erreur lors de la suppression");
    } finally {
      setShowConfirm(false);
    }
  };

  const defaultImg = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";

  return (
    <>
      <Card className="product-card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
        <div className="product-img-wrapper position-relative">
          <Card.Img
            variant="top"
            src={el?.img || defaultImg}
            alt={el?.nameproduct}
            className="product-img"
            onError={(e) => {
              e.target.src = defaultImg;
            }}
          />
          <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2 px-2 py-1 fs-6 fw-bold shadow-sm">
            {el?.price} TND
          </Badge>
          <Badge bg="secondary" className="position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm">
            {el?.category || "Informatique"}
          </Badge>
        </div>

        <Card.Body className="d-flex flex-column p-3">
          <Card.Title className="fw-bold fs-5 text-truncate mb-1">{el?.nameproduct}</Card.Title>
          <Card.Text className="text-muted small flex-grow-1 line-clamp-2">
            {el?.description || "Produit certifié avec garantie constructeur."}
          </Card.Text>

          <div className="d-flex justify-content-between align-items-center mb-3 pt-2 border-top">
            <span className="small text-muted">Disponibilité :</span>
            <span className={`badge ${el?.countInStock > 0 ? "bg-success-subtle text-success border border-success" : "bg-danger-subtle text-danger"}`}>
              {el?.countInStock > 0 ? `${el?.countInStock} en stock` : "Rupture de stock"}
            </span>
          </div>

          <div className="d-flex gap-2 mt-auto">
            <EditProduct el={el} />
            <Button
              variant="outline-danger"
              size="sm"
              className="px-2"
              onClick={() => setShowConfirm(true)}
              title="Supprimer le produit"
            >
              🗑️
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 fw-bold">Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-3">
          <p className="mb-1">Voulez-vous vraiment supprimer ce produit ?</p>
          <strong className="text-danger">{el?.nameproduct}</strong>
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0 pt-0">
          <Button variant="secondary" size="sm" onClick={() => setShowConfirm(false)}>
            Annuler
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Supprimer définitivement
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductCard;
