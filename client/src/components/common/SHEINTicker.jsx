import React from "react";
import { Container } from "react-bootstrap";

function SHEINTicker() {
  return (
    <div className="shein-ticker py-2 text-white text-center small fw-semibold">
      <Container className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="d-none d-md-block text-white-50" style={{ fontSize: "0.78rem" }}>
          LIVRAISON STANDARD GRATUITE DÈS 100 TND
        </div>
        <div className="mx-auto text-uppercase letter-spacing-1" style={{ fontSize: "0.82rem" }}>
          VENTES FLASH DE MI-SAISON : JUSQU'À -60% | CODE : <span className="badge bg-warning text-dark ms-1">SHEIN20</span>
        </div>
        <div className="d-none d-lg-block text-white-50" style={{ fontSize: "0.78rem" }}>
          RETOURS FACILES SOUS 30 JOURS
        </div>
      </Container>
    </div>
  );
}

export default SHEINTicker;
