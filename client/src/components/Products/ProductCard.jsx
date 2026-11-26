import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteproduct, upvoteProduct } from "../../redux/productSlice";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";
import { IconUpvote, IconGithub, IconExternal, IconTrash } from "../common/Icons";

function ProductCard({ el }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showConfirm, setShowConfirm] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleUpvote = async () => {
    try {
      await dispatch(upvoteProduct(el?._id)).unwrap();
      setHasVoted(true);
      toast.success(`+1 vote pour "${el?.nameproduct}" !`);
    } catch (err) {
      toast.error(err || "Erreur de vote");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteproduct(el?._id)).unwrap();
      toast.success("Projet retiré de la vitrine");
    } catch (err) {
      toast.error(err || "Erreur de suppression");
    } finally {
      setShowConfirm(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "En ligne":
        return <span className="status-badge-online">En ligne</span>;
      case "Bêta":
        return <span className="status-badge-beta">Bêta</span>;
      case "Recherche de contributeurs":
        return <span className="status-badge-contrib">Recrute dev</span>;
      default:
        return <span className="status-badge-prototype">Prototype</span>;
    }
  };

  const defaultImg = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";

  return (
    <>
      <div className="dev-project-card">
        {/* Project Thumbnail */}
        <div className="dev-card-img-wrapper">
          <img
            src={el?.img || defaultImg}
            alt={el?.nameproduct}
            className="dev-card-img"
            onError={(e) => {
              e.target.src = defaultImg;
            }}
          />
          <div className="position-absolute top-0 start-0 m-2">
            {getStatusBadge(el?.status)}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3 d-flex flex-column flex-grow-1">
          {/* Header Row: Category & Upvote Button */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted fw-bold small text-uppercase" style={{ fontSize: "0.72rem" }}>
              {el?.category || "Web Fullstack"}
            </span>

            <button
              type="button"
              className={`btn-upvote ${hasVoted ? "border-warning bg-warning bg-opacity-10 text-dark" : ""}`}
              onClick={handleUpvote}
              title="Voter pour ce projet"
            >
              <IconUpvote size={13} />
              <span>{el?.upvotes || 1}</span>
            </button>
          </div>

          {/* Project Title */}
          <h5 className="fw-bold text-dark mb-1 text-truncate" title={el?.nameproduct}>
            {el?.nameproduct}
          </h5>

          {/* Tagline */}
          <p className="text-muted small mb-3 flex-grow-1" style={{ fontSize: "0.84rem", lineHeight: 1.5 }}>
            {el?.tagline || el?.description}
          </p>

          {/* Technology Badges */}
          <div className="d-flex gap-1 flex-wrap mb-3">
            {el?.technologies && el.technologies.length > 0 ? (
              el.technologies.slice(0, 4).map((tech, idx) => (
                <span key={idx} className="dev-tech-tag">
                  {tech}
                </span>
              ))
            ) : (
              <span className="dev-tech-tag">MERN</span>
            )}
          </div>

          {/* Author info & Action links */}
          <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
            <div className="d-flex align-items-center gap-2">
              <img
                src={el?.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                alt={el?.authorName || "Auteur"}
                style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }}
              />
              <span className="small text-muted fw-semibold" style={{ fontSize: "0.78rem" }}>
                {el?.authorName || "Étudiant GL3"}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              {el?.githubUrl && (
                <a
                  href={el.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-light p-1 text-dark"
                  title="Voir le code source GitHub"
                >
                  <IconGithub size={16} />
                </a>
              )}
              {el?.demoUrl && (
                <a
                  href={el.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-light p-1 text-primary"
                  title="Tester la démo en ligne"
                >
                  <IconExternal size={16} />
                </a>
              )}

              {/* Edit/Delete for Admin or Author */}
              {user?.isAdmin && (
                <>
                  <EditProduct el={el} />
                  <button
                    type="button"
                    className="btn btn-sm btn-light p-1 text-danger border-0"
                    onClick={() => setShowConfirm(true)}
                    title="Supprimer le projet"
                  >
                    <IconTrash size={15} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered size="sm">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fs-6 fw-bold">Supprimer le projet</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3 text-muted small">
          Êtes-vous sûr de retirer ce projet de la vitrine ?
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
