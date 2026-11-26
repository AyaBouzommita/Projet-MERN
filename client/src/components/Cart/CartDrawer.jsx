import React, { useState } from "react";
import { Offcanvas, Button, Form, ProgressBar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  closeCart,
  removeFromCart,
  updateQty,
  applyPromoCode,
} from "../../redux/cartSlice";
import { IconTrash, IconCheck } from "../common/Icons";
import CheckoutModal from "./CheckoutModal";

function CartDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen, promoCode, discountPercent } = useSelector(
    (state) => state.cart
  );

  const [inputCode, setInputCode] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  // Subtotal calculation
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Free shipping threshold at 100 TND
  const freeShippingThreshold = 100;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shipping = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 7;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Discount
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    dispatch(applyPromoCode(inputCode));
  };

  return (
    <>
      <Offcanvas
        show={isOpen}
        onHide={() => dispatch(closeCart())}
        placement="end"
        style={{ width: "420px" }}
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-bold fs-5 text-dark d-flex align-items-center gap-2">
            <span>PANIER D'ACHATS</span>
            <span className="badge bg-dark rounded-pill fs-6">{items.length}</span>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column p-0">
          {/* Free Shipping Progress Banner */}
          <div className="p-3 bg-light border-bottom">
            <div className="d-flex justify-content-between align-items-center small mb-1">
              <span className="fw-semibold text-dark">
                {missingForFreeShipping === 0
                  ? "Livraison standard OFFERTE !"
                  : `Plus que ${missingForFreeShipping} TND pour la livraison gratuite`}
              </span>
              <span className="text-muted fw-bold">{progressPercent}%</span>
            </div>
            <ProgressBar
              now={progressPercent}
              variant={progressPercent === 100 ? "success" : "danger"}
              style={{ height: "6px" }}
            />
          </div>

          {/* Cart Item List */}
          <div className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-3">
            {items.length === 0 ? (
              <div className="text-center py-5 my-auto">
                <div className="fs-1 text-muted mb-2">🛍️</div>
                <h6 className="fw-bold text-dark">Votre panier est vide</h6>
                <p className="text-muted small mb-3">
                  Découvrez nos dernières tendances et remplissez votre panier !
                </p>
                <Button
                  variant="dark"
                  size="sm"
                  className="btn-shein-primary px-4 py-2"
                  onClick={() => dispatch(closeCart())}
                >
                  Commencer le shopping
                </Button>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item._id}-${item.size}-${item.color}-${index}`}
                  className="d-flex gap-3 pb-3 border-bottom position-relative"
                >
                  <img
                    src={item.img}
                    alt={item.nameproduct}
                    style={{
                      width: "80px",
                      height: "105px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                  <div className="d-flex flex-column flex-grow-1">
                    <div className="d-flex justify-content-between pe-3">
                      <h6 className="fw-bold text-dark small text-truncate mb-1" style={{ maxWidth: "200px" }}>
                        {item.nameproduct}
                      </h6>
                      <button
                        type="button"
                        className="btn btn-link text-muted p-0 border-0"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              _id: item._id,
                              size: item.size,
                              color: item.color,
                            })
                          )
                        }
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.78rem" }}>
                      <span className="badge bg-light text-dark border">Taille: {item.size}</span>
                      <span
                        className="d-inline-block rounded-circle border"
                        style={{ width: "12px", height: "12px", backgroundColor: item.color }}
                      ></span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div className="d-flex align-items-center border rounded">
                        <button
                          type="button"
                          className="btn btn-sm btn-light py-0 px-2 border-0"
                          onClick={() =>
                            dispatch(
                              updateQty({
                                _id: item._id,
                                size: item.size,
                                color: item.color,
                                qty: item.qty - 1,
                              })
                            )
                          }
                        >
                          -
                        </button>
                        <span className="px-2 small fw-bold">{item.qty}</span>
                        <button
                          type="button"
                          className="btn btn-sm btn-light py-0 px-2 border-0"
                          onClick={() =>
                            dispatch(
                              updateQty({
                                _id: item._id,
                                size: item.size,
                                color: item.color,
                                qty: item.qty + 1,
                              })
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className="text-end">
                        <div className="fw-bold text-danger">{item.price * item.qty} TND</div>
                        {item.oldPrice && (
                          <div className="text-muted text-decoration-line-through" style={{ fontSize: "0.75rem" }}>
                            {item.oldPrice * item.qty} TND
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer of Drawer */}
          {items.length > 0 && (
            <div className="p-3 border-top bg-white">
              {/* Promo Code Form */}
              <Form onSubmit={handleApplyPromo} className="d-flex gap-2 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Code Promo (ex: SHEIN20)"
                  size="sm"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="text-uppercase"
                />
                <Button variant="dark" size="sm" type="submit" className="px-3">
                  Appliquer
                </Button>
              </Form>

              {discountPercent > 0 && (
                <div className="alert alert-success py-1 px-2 small mb-2 d-flex align-items-center gap-1">
                  <IconCheck size={14} />
                  <span>Code <strong>{promoCode}</strong> appliqué (-{discountPercent}%)</span>
                </div>
              )}

              {/* Subtotal breakdown */}
              <div className="d-flex flex-column gap-1 small mb-3">
                <div className="d-flex justify-content-between text-muted">
                  <span>Sous-total :</span>
                  <span>{subtotal} TND</span>
                </div>
                {discountAmount > 0 && (
                  <div className="d-flex justify-content-between text-danger fw-semibold">
                    <span>Réduction promo :</span>
                    <span>-{discountAmount} TND</span>
                  </div>
                )}
                <div className="d-flex justify-content-between text-muted">
                  <span>Livraison :</span>
                  <span>{shipping === 0 ? "GRATUIT" : `${shipping} TND`}</span>
                </div>
                <div className="d-flex justify-content-between pt-2 border-top fs-5 fw-bold text-dark">
                  <span>Total estimé :</span>
                  <span className="text-danger">{total} TND</span>
                </div>
              </div>

              <Button
                variant="dark"
                className="w-100 py-3 fw-bold text-uppercase letter-spacing-1 btn-shein-checkout"
                onClick={() => setShowCheckout(true)}
              >
                Passer la commande ({total} TND)
              </Button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Checkout Modal */}
      <CheckoutModal
        show={showCheckout}
        onHide={() => setShowCheckout(false)}
        total={total}
        subtotal={subtotal}
        discountAmount={discountAmount}
        shipping={shipping}
      />
    </>
  );
}

export default CartDrawer;
