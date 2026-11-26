import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, closeCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { IconCheck, IconShield, IconTruck } from "../common/Icons";

function CheckoutModal({ show, onHide, total, subtotal, discountAmount, shipping }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: "",
    address: "",
    governorate: "Tunis",
    city: "",
    postalCode: "",
    paymentMethod: "cod", // Cash On Delivery
    notes: "",
  });

  const governorates = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
    "Béja", "Jendouba", "Le Kef", "Siliana", "Sousse", "Monastir", "Mahdia",
    "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabès", "Médenine", "Tataouine",
    "Gafsa", "Tozeur", "Kébili"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Veuillez remplir vos coordonnées de livraison");
      return;
    }

    // Success order placement
    toast.success("Commande validée avec succès ! Un SMS de confirmation vous a été envoyé.");
    dispatch(clearCart());
    dispatch(closeCart());
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5 text-dark">
          Validation de la Commande
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Row className="gy-4">
            <Col lg={7}>
              <h6 className="fw-bold text-dark mb-3 pb-2 border-bottom">
                1. Adresse de Livraison en Tunisie
              </h6>

              <Row className="g-3 mb-3">
                <Col sm={6}>
                  <Form.Label className="small fw-semibold text-dark">Nom et prénom *</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Destinataire"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label className="small fw-semibold text-dark">Numéro de téléphone *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Ex: 98 123 456"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-dark">Adresse exacte *</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Rue, numéro, bâtiment, appartement..."
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row className="g-3 mb-4">
                <Col sm={6}>
                  <Form.Label className="small fw-semibold text-dark">Gouvernorat *</Form.Label>
                  <Form.Select name="governorate" value={formData.governorate} onChange={handleChange}>
                    {governorates.map((gov) => (
                      <option key={gov} value={gov}>{gov}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Form.Label className="small fw-semibold text-dark">Ville / Délégation *</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="Ville"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>

              <h6 className="fw-bold text-dark mb-3 pb-2 border-bottom">
                2. Mode de Paiement
              </h6>

              <div className="d-flex flex-column gap-2 mb-3">
                <label className={`p-3 border rounded-3 d-flex align-items-center gap-3 cursor-pointer ${formData.paymentMethod === "cod" ? "border-dark bg-light" : ""}`} style={{ cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                  />
                  <div>
                    <strong className="d-block text-dark small">Paiement à la livraison (Espèces)</strong>
                    <span className="text-muted" style={{ fontSize: "0.78rem" }}>Réglez votre commande directement auprès du livreur à la réception de votre colis.</span>
                  </div>
                </label>

                <label className={`p-3 border rounded-3 d-flex align-items-center gap-3 cursor-pointer ${formData.paymentMethod === "card" ? "border-dark bg-light" : ""}`} style={{ cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  <div>
                    <strong className="d-block text-dark small">Carte Bancaire (GIM-TEL / ClicToPay)</strong>
                    <span className="text-muted" style={{ fontSize: "0.78rem" }}>Paiement instantané 100% sécurisé via passerelle bancaire tunisienne.</span>
                  </div>
                </label>
              </div>
            </Col>

            <Col lg={5}>
              <div className="p-3 bg-light rounded-3 border">
                <h6 className="fw-bold text-dark mb-3">Récapitulatif ({items.length} articles)</h6>

                <div className="d-flex flex-column gap-2 mb-3 max-h-200 overflow-auto pe-1" style={{ maxHeight: 200 }}>
                  {items.map((item, idx) => (
                    <div key={`${item._id}-${idx}`} className="d-flex gap-2 align-items-center small pb-2 border-bottom">
                      <img src={item.img} alt={item.nameproduct} style={{ width: 42, height: 50, objectFit: "cover", borderRadius: 4 }} />
                      <div className="flex-grow-1 text-truncate">
                        <div className="fw-semibold text-truncate">{item.nameproduct}</div>
                        <div className="text-muted" style={{ fontSize: "0.75rem" }}>Taille: {item.size} × {item.qty}</div>
                      </div>
                      <div className="fw-bold">{item.price * item.qty} TND</div>
                    </div>
                  ))}
                </div>

                <div className="d-flex flex-column gap-2 small">
                  <div className="d-flex justify-content-between text-muted">
                    <span>Sous-total :</span>
                    <span>{subtotal} TND</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="d-flex justify-content-between text-danger fw-semibold">
                      <span>Remise Promo :</span>
                      <span>-{discountAmount} TND</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between text-muted">
                    <span>Frais de port :</span>
                    <span>{shipping === 0 ? "GRATUIT" : `${shipping} TND`}</span>
                  </div>
                  <div className="d-flex justify-content-between pt-2 border-top fs-5 fw-bold text-dark">
                    <span>Total à payer :</span>
                    <span className="text-danger">{total} TND</span>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-white rounded border small text-muted">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <IconShield size={14} className="text-success" />
                    <span style={{ fontSize: "0.75rem" }}>Garantie retour sous 30 jours</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <IconTruck size={14} className="text-primary" />
                    <span style={{ fontSize: "0.75rem" }}>Expédié sous 24h ouvrées</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 px-4 pb-4">
          <Button variant="light" className="btn-outline-pro" onClick={onHide}>
            Continuer mes achats
          </Button>
          <Button type="submit" className="btn-shein-primary px-4 py-2">
            Confirmer ma commande ({total} TND)
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CheckoutModal;
