import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteproduct } from "../../redux/productSlice";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";
import { IconTrash } from "../common/Icons";

function ProductCard({ el }) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteproduct(el?._id)).unwrap();
      toast.success(`Produit "${el?.nameproduct}" supprimé`);
    } catch (err) {
      toast.error(err || "Erreur de suppression");
    } finally {
      setShowConfirm(false);
    }
  };

  const defaultImg = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";

  const formattedPrice = el?.price ? new Intl.NumberFormat("fr-TN").format(el.price) : "0";

  return (
    <>
      <div className="pro-card">
        <div className="pro-card-img-wrapper">
          <img
            src={el?.img || defaultImg}
            alt={el?.nameproduct}
            className="pro-card-img"
            onError={(e) => {
              e.target.src = defaultImg;
            }}
          />
        </div>

        <div className="pro-card-body">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="pro-category-tag">{el?.category || "Matériel"}</span>
            <span className={`badge-status ${el?.countInStock > 0 ? "badge-in-stock" : "badge-low-stock"}`}>
              <span className="badge-status-dot"></span>
              {el?.countInStock > 0 ? `${el?.countInStock} en stock` : "Rupture"}
            </span>
          </div>

          <h5 className="pro-card-title text-truncate" title={el?.nameproduct}>
            {el?.nameproduct}
          </h5>

          <p className="pro-card-desc">
            {el?.description || "Spécifications professionnelles et garantie constructeur officielle."}
          </p>

          <div className="d-flex justify-content-between align-items-baseline mb-3 pt-2 border-top">
            <div className="pro-price">
              {formattedPrice} <span className="pro-price-unit">TND</span>
            </div>
            <span className="text-muted" style={{ fontSize: "0.75rem" }}>TTC</span>
          </div>

          <div className="d-flex gap-2 mt-auto">
            <EditProduct el={el} />
            <Button
              variant="light"
              size="sm"
              className="btn-outline-pro px-2"
              onClick={() => setShowConfirm(true)}
              title="Supprimer la référence"
            >
              <IconTrash size={15} />
            </Button>
          </div>
        </div>
      </div>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered size="sm">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fs-6 fw-bold text-dark">Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3 text-muted small">
          Êtes-vous sûr de vouloir retirer définitivement ce produit du catalogue ?
          <div className="fw-bold text-dark mt-2">{el?.nameproduct}</div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" size="sm" className="btn-outline-pro" onClick={() => setShowConfirm(false)}>
            Annuler
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete} className="px-3">
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductCard;
