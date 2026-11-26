import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteproduct } from "../../redux/productSlice";
import { addToCart, toggleWishlist } from "../../redux/cartSlice";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";
import { IconTrash, IconHeart, IconStar, IconBag } from "../common/Icons";

function ProductCard({ el }) {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [selectedSize, setSelectedSize] = useState(
    el?.sizes && el.sizes.length > 0 ? el.sizes[0] : "M"
  );
  const [selectedColor, setSelectedColor] = useState(
    el?.colors && el.colors.length > 0 ? el.colors[0] : "#000000"
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const isLiked = wishlist.includes(el?._id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: el?._id,
        nameproduct: el?.nameproduct,
        price: el?.price,
        oldPrice: el?.oldPrice,
        img: el?.img,
        size: selectedSize,
        color: selectedColor,
        qty: 1,
      })
    );
    toast.success(`"${el?.nameproduct}" ajouté au panier !`);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteproduct(el?._id)).unwrap();
      toast.success("Produit retiré du catalogue");
    } catch (err) {
      toast.error(err || "Erreur de suppression");
    } finally {
      setShowConfirm(false);
    }
  };

  const defaultImg = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80";

  return (
    <>
      <div className="shein-product-card">
        {/* Image Container with Badges */}
        <div className="shein-img-wrapper">
          <img
            src={el?.img || defaultImg}
            alt={el?.nameproduct}
            className="shein-img"
            onError={(e) => {
              e.target.src = defaultImg;
            }}
          />

          {/* Discount Badge */}
          {el?.discount > 0 && (
            <div className="shein-discount-badge">-{el.discount}%</div>
          )}

          {/* Flash Sale Tag */}
          {el?.isFlashSale && (
            <div className="shein-flash-badge">FLASH</div>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            className="shein-wishlist-btn"
            onClick={() => {
              dispatch(toggleWishlist(el?._id));
              toast.info(isLiked ? "Retiré des favoris" : "Ajouté à vos favoris");
            }}
          >
            <IconHeart size={18} filled={isLiked} />
          </button>

          {/* Quick Add To Cart Hover Button */}
          <div className="shein-quick-add">
            <button
              type="button"
              className="btn btn-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-bold text-uppercase"
              style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}
              onClick={handleAddToCart}
            >
              <IconBag size={15} />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="shein-card-body p-2 pt-3">
          {/* Color Dots */}
          {el?.colors && el.colors.length > 0 && (
            <div className="d-flex gap-1 mb-2">
              {el.colors.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`shein-color-dot ${selectedColor === c ? "active" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>
          )}

          {/* Title */}
          <h6 className="shein-title text-truncate mb-1" title={el?.nameproduct}>
            {el?.nameproduct}
          </h6>

          {/* Price */}
          <div className="d-flex align-items-baseline gap-2 mb-2">
            <span className="shein-price">{el?.price} TND</span>
            {el?.oldPrice && (
              <span className="shein-old-price">{el.oldPrice} TND</span>
            )}
          </div>

          {/* Rating */}
          <div className="d-flex align-items-center gap-1 mb-2 small">
            <IconStar size={13} />
            <span className="fw-bold">{el?.rating || 4.8}</span>
            <span className="text-muted" style={{ fontSize: "0.72rem" }}>
              ({el?.reviewsCount || 120})
            </span>
          </div>

          {/* Sizes Options */}
          {el?.sizes && el.sizes.length > 0 && (
            <div className="d-flex gap-1 flex-wrap mb-2">
              {el.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`shein-size-pill ${selectedSize === s ? "active" : ""}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Admin Edit/Delete Controls */}
          {user?.isAdmin && (
            <div className="d-flex gap-1 mt-2 pt-2 border-top">
              <EditProduct el={el} />
              <Button
                variant="light"
                size="sm"
                className="btn-outline-pro px-2"
                onClick={() => setShowConfirm(true)}
                title="Supprimer"
              >
                <IconTrash size={14} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered size="sm">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fs-6 fw-bold">Supprimer l'article</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3 text-muted small">
          Êtes-vous sûr de retirer cette référence de la boutique ?
          <div className="fw-bold text-dark mt-2">{el?.nameproduct}</div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" size="sm" onClick={() => setShowConfirm(false)}>
            Annuler
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductCard;
