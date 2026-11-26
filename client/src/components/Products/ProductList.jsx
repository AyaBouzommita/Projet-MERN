import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../../redux/productSlice";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import { IconSearch, IconRefresh, IconRocket } from "../common/Icons";

function ProductList() {
  const dispatch = useDispatch();
  const { productlist, loading, error } = useSelector((state) => state.product);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [status, setStatus] = useState("Tous");
  const [sortBy, setSortBy] = useState("upvotes_desc");

  const categories = [
    "Tous",
    "IA & Machine Learning",
    "Web Fullstack",
    "Mobile & Applications",
    "DevOps & Cloud",
    "Cybersécurité",
    "IoT & Embarqué",
  ];

  const statuses = [
    "Tous",
    "En ligne",
    "Bêta",
    "Prototype",
    "Recherche de contributeurs",
  ];

  useEffect(() => {
    dispatch(getproducts({ search, category, status, sortBy }));
  }, [dispatch, category, status, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getproducts({ search, category, status, sortBy }));
  };

  const handleReset = () => {
    setSearch("");
    setCategory("Tous");
    setStatus("Tous");
    setSortBy("upvotes_desc");
    dispatch(getproducts({ sortBy: "upvotes_desc" }));
  };

  return (
    <div className="py-4">
      <Container>
        {/* Header Ribbon */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
          <div>
            <div className="dev-pill mb-1">
              <IconRocket size={14} />
              <span>Répertoire Open Source & Démos</span>
            </div>
            <h2 className="fw-bold mb-1 text-dark">
              {category === "Tous" ? "Tous les Projets Étudiants" : `Projets : ${category}`}
            </h2>
            <p className="text-muted small mb-0">
              Explorez les créations logicielles, testez les démos interactives et votez pour vos favoris.
            </p>
          </div>
          <div>
            <AddProduct />
          </div>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-white border rounded-3 p-3 mb-4 shadow-sm">
          <Row className="g-3 align-items-center">
            {/* Search Input */}
            <Col lg={5} md={5}>
              <Form onSubmit={handleSearchSubmit}>
                <div className="position-relative">
                  <span className="search-icon-pos">
                    <IconSearch size={16} />
                  </span>
                  <Form.Control
                    type="search"
                    placeholder="Rechercher par mot-clé, React, Python, Docker..."
                    className="dev-search-input w-100"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </Form>
            </Col>

            {/* Sort Select */}
            <Col lg={3} md={3}>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select-sm py-2"
                style={{ borderRadius: 8 }}
              >
                <option value="upvotes_desc">Tri : Plus populaires (Top Votes ▲)</option>
                <option value="newest">Tri : Projets les plus récents</option>
                <option value="name_asc">Tri : Alphabétique (A à Z)</option>
              </Form.Select>
            </Col>

            {/* Status Select */}
            <Col lg={2} md={2}>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-select-sm py-2"
                style={{ borderRadius: 8 }}
              >
                <option value="Tous">Tous les statuts</option>
                <option value="En ligne">En ligne</option>
                <option value="Bêta">Bêta</option>
                <option value="Prototype">Prototype</option>
                <option value="Recherche de contributeurs">Recrute dev</option>
              </Form.Select>
            </Col>

            {/* Reset */}
            <Col lg={2} md={2} className="text-md-end">
              <Button
                variant="light"
                size="sm"
                className="btn-outline-pro w-100 d-inline-flex align-items-center justify-content-center gap-1"
                onClick={handleReset}
              >
                <IconRefresh size={14} />
                <span>Réinitialiser</span>
              </Button>
            </Col>
          </Row>

          {/* Category Tabs */}
          <div className="d-flex gap-2 flex-wrap mt-3 pt-3 border-top">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`dev-category-tab ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Summary */}
        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
          <span>{productlist?.length || 0} projet(s) répertorié(s)</span>
          {category !== "Tous" && (
            <span>Filtre actif : <strong>{category}</strong></span>
          )}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <div className="text-muted small mt-2">Chargement des projets étudiants...</div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center small py-3">{error}</div>
        ) : productlist && productlist.length > 0 ? (
          <Row xs={1} sm={2} md={2} lg={3} className="g-4">
            {productlist.map((el) => (
              <Col key={el._id}>
                <ProductCard el={el} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 bg-white border rounded-3 p-4">
            <h5 className="fw-bold text-dark mb-1">Aucun projet trouvé</h5>
            <p className="text-muted small mb-3">Aucune réalisation ne correspond aux filtres appliqués.</p>
            <Button className="btn-outline-pro" onClick={handleReset}>
              Afficher tous les projets
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ProductList;
