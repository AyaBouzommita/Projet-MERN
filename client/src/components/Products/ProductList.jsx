import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../../redux/productSlice";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import { IconSearch, IconRefresh } from "../common/Icons";

function ProductList() {
  const dispatch = useDispatch();
  const { productlist, loading, error } = useSelector((state) => state.product);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("");

  const categories = ["Tous", "Informatique", "Smartphones", "Audio", "Gaming", "Accessoires"];

  useEffect(() => {
    dispatch(getproducts({ search, category, sortBy }));
  }, [dispatch, category, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getproducts({ search, category, sortBy }));
  };

  const handleReset = () => {
    setSearch("");
    setCategory("Tous");
    setSortBy("");
    dispatch(getproducts({}));
  };

  return (
    <div className="py-4">
      <Container>
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Catalogue Matériel & Solutions</h2>
            <p className="text-muted small mb-0">
              Gestion de l'inventaire et consultation des références certifiées en stock.
            </p>
          </div>
          <div>
            <AddProduct />
          </div>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-white border rounded-3 p-3 mb-4 shadow-sm">
          <Row className="g-3 align-items-center">
            <Col lg={5} md={6}>
              <Form onSubmit={handleSearchSubmit}>
                <div className="position-relative">
                  <span className="search-icon-pos">
                    <IconSearch size={16} />
                  </span>
                  <Form.Control
                    type="search"
                    placeholder="Filtrer par nom de référence..."
                    className="search-input-pro w-100"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </Form>
            </Col>

            <Col lg={4} md={4}>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select-sm py-2"
                style={{ borderRadius: 8 }}
              >
                <option value="">Tri : Plus récents</option>
                <option value="price_asc">Prix : Ordre croissant</option>
                <option value="price_desc">Prix : Ordre décroissant</option>
                <option value="name_asc">Alphabétique (A à Z)</option>
                <option value="name_desc">Alphabétique (Z à A)</option>
              </Form.Select>
            </Col>

            <Col lg={3} md={2} className="text-md-end">
              <Button variant="light" size="sm" className="btn-outline-pro d-inline-flex align-items-center gap-1" onClick={handleReset}>
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
                className={`category-pill ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result Counter */}
        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
          <span>{productlist?.length || 0} résultat(s) disponible(s)</span>
          {category !== "Tous" && (
            <span>Catégorie sélectionnée : <strong>{category}</strong></span>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <div className="text-muted small mt-2">Chargement du catalogue...</div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center small py-3">{error}</div>
        ) : productlist && productlist.length > 0 ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {productlist.map((el) => (
              <Col key={el._id}>
                <ProductCard el={el} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 bg-white border rounded-3 p-4">
            <h5 className="fw-bold text-dark mb-1">Aucune référence trouvée</h5>
            <p className="text-muted small mb-3">Aucun produit ne correspond aux filtres appliqués.</p>
            <Button className="btn-outline-pro" onClick={handleReset}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ProductList;
