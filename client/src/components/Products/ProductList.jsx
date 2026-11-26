import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup, Spinner, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../../redux/productSlice";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";

function ProductList() {
  const dispatch = useDispatch();
  const { productlist, loading, error } = useSelector((state) => state.product);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("");

  const categories = ["Tous", "Informatique", "Smartphones", "Accessoires", "Audio", "Gaming"];

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
    <Container className="py-4">
      {/* Header section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 p-4 bg-light rounded-4 border">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Catalogue des Produits</h2>
          <p className="text-muted small mb-0">
            Parcourez, filtrez et gérez les articles du catalogue en temps réel.
          </p>
        </div>
        <div>
          <AddProduct />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-card p-3 mb-4 rounded-3 border bg-white shadow-sm">
        <Row className="g-3 align-items-center">
          <Col lg={5} md={6}>
            <Form onSubmit={handleSearchSubmit}>
              <InputGroup>
                <Form.Control
                  placeholder="Rechercher par nom de produit..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Rechercher
                </Button>
              </InputGroup>
            </Form>
          </Col>

          <Col lg={4} md={6}>
            <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Trier par défaut (Récent)</option>
              <option value="price_asc">Prix : Moins cher au plus cher</option>
              <option value="price_desc">Prix : Plus cher au moins cher</option>
              <option value="name_asc">Nom : A à Z</option>
              <option value="name_desc">Nom : Z à A</option>
            </Form.Select>
          </Col>

          <Col lg={3} className="text-end">
            <Button variant="outline-secondary" size="sm" onClick={handleReset}>
              🔄 Réinitialiser
            </Button>
          </Col>
        </Row>

        {/* Categories Pills */}
        <div className="d-flex gap-2 flex-wrap mt-3 pt-3 border-top">
          <span className="small text-muted me-2 align-self-center">Catégories :</span>
          {categories.map((cat) => (
            <Badge
              key={cat}
              bg={category === cat ? "primary" : "light"}
              text={category === cat ? "white" : "dark"}
              className="px-3 py-2 cursor-pointer border user-select-none"
              onClick={() => setCategory(cat)}
              style={{ cursor: "pointer" }}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Product Content */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-2">Chargement des produits...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : productlist && productlist.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {productlist.map((el) => (
            <Col key={el._id}>
              <ProductCard el={el} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5 bg-light rounded-4 border">
          <h4 className="fw-bold text-muted">Aucun produit trouvé</h4>
          <p className="text-muted small">Essayez de modifier vos filtres ou ajoutez un nouveau produit.</p>
          <Button variant="primary" onClick={handleReset}>
            Voir tous les produits
          </Button>
        </div>
      )}
    </Container>
  );
}

export default ProductList;
