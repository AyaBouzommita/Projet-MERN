import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../../redux/productSlice";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import { IconSearch, IconRefresh } from "../common/Icons";

function ProductList() {
  const dispatch = useDispatch();
  const { productlist, loading, error } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("");
  const [onlyFlash, setOnlyFlash] = useState(false);

  const categories = [
    "Tous",
    "Robes",
    "Hauts & Tops",
    "Vestes & Manteaux",
    "Pantalons & Bas",
    "Chaussures",
    "Sacs & Accessoires",
  ];

  useEffect(() => {
    dispatch(
      getproducts({
        search,
        category,
        sortBy,
        isFlashSale: onlyFlash ? "true" : undefined,
      })
    );
  }, [dispatch, category, sortBy, onlyFlash]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      getproducts({
        search,
        category,
        sortBy,
        isFlashSale: onlyFlash ? "true" : undefined,
      })
    );
  };

  const handleReset = () => {
    setSearch("");
    setCategory("Tous");
    setSortBy("");
    setOnlyFlash(false);
    dispatch(getproducts({}));
  };

  return (
    <div className="py-4">
      <Container>
        {/* Header Ribbon */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
          <div>
            <h2 className="fw-extrabold mb-1 text-dark text-uppercase letter-spacing-1">
              {category === "Tous" ? "Toute la Collection Mode" : `Collection ${category}`}
            </h2>
            <p className="text-muted small mb-0">
              Découvrez les dernières tendances, coupes et styles de la saison.
            </p>
          </div>
          <div className="d-flex align-items-center gap-2">
            {user?.isAdmin && <AddProduct />}
          </div>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-white border rounded-3 p-3 mb-4 shadow-sm">
          <Row className="g-3 align-items-center">
            {/* Search */}
            <Col lg={5} md={5}>
              <Form onSubmit={handleSearchSubmit}>
                <div className="position-relative">
                  <span className="search-icon-pos">
                    <IconSearch size={16} />
                  </span>
                  <Form.Control
                    type="search"
                    placeholder="Rechercher une robe, top, veste..."
                    className="shein-search-input w-100"
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
                style={{ borderRadius: 6 }}
              >
                <option value="">Trier : Nouveautés</option>
                <option value="discount_desc">Meilleures Réductions (-%)</option>
                <option value="price_asc">Prix : Moins cher au plus cher</option>
                <option value="price_desc">Prix : Plus cher au moins cher</option>
                <option value="name_asc">Nom : A à Z</option>
              </Form.Select>
            </Col>

            {/* Flash Sale Toggle */}
            <Col lg={2} md={2}>
              <Button
                variant={onlyFlash ? "danger" : "outline-danger"}
                size="sm"
                className="w-100 py-2 fw-bold text-uppercase"
                style={{ fontSize: "0.78rem" }}
                onClick={() => setOnlyFlash(!onlyFlash)}
              >
                ⚡ Ventes Flash
              </Button>
            </Col>

            {/* Reset */}
            <Col lg={2} md={2} className="text-md-end">
              <Button
                variant="light"
                size="sm"
                className="btn-outline-pro d-inline-flex align-items-center gap-1 w-100 justify-content-center"
                onClick={handleReset}
              >
                <IconRefresh size={14} />
                <span>Réinitialiser</span>
              </Button>
            </Col>
          </Row>

          {/* Category Pills */}
          <div className="d-flex gap-2 flex-wrap mt-3 pt-3 border-top">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`shein-category-tab ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Summary */}
        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
          <span>{productlist?.length || 0} article(s) trouvé(s)</span>
          {onlyFlash && (
            <Badge bg="danger" className="px-2 py-1">Filtre Ventes Flash Actif</Badge>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="dark" />
            <div className="text-muted small mt-2">Chargement des pièces mode...</div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center small py-3">{error}</div>
        ) : productlist && productlist.length > 0 ? (
          <Row xs={2} sm={2} md={3} lg={4} className="g-3 g-md-4">
            {productlist.map((el) => (
              <Col key={el._id}>
                <ProductCard el={el} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 bg-white border rounded-3 p-4">
            <h5 className="fw-bold text-dark mb-1">Aucun article trouvé</h5>
            <p className="text-muted small mb-3">Essayez de modifier votre recherche ou sélectionnez une autre catégorie.</p>
            <Button variant="dark" onClick={handleReset}>
              Voir tous les articles
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ProductList;
