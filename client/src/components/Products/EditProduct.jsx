import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editproduct } from "../../redux/productSlice";
import { toast } from "react-toastify";
import { IconEdit } from "../common/Icons";

function EditProduct({ el }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [edited, setEdited] = useState({
    nameproduct: el?.nameproduct || "",
    tagline: el?.tagline || "",
    description: el?.description || "",
    category: el?.category || "Web Fullstack",
    technologies: Array.isArray(el?.technologies) ? el.technologies.join(", ") : el?.technologies || "",
    img: el?.img || "",
    githubUrl: el?.githubUrl || "",
    demoUrl: el?.demoUrl || "",
    status: el?.status || "Bêta",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEdited({
      nameproduct: el?.nameproduct || "",
      tagline: el?.tagline || "",
      description: el?.description || "",
      category: el?.category || "Web Fullstack",
      technologies: Array.isArray(el?.technologies) ? el.technologies.join(", ") : el?.technologies || "",
      img: el?.img || "",
      githubUrl: el?.githubUrl || "",
      demoUrl: el?.demoUrl || "",
      status: el?.status || "Bêta",
    });
    setShow(true);
  };

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        editproduct({
          id: el?._id,
          edited: {
            ...edited,
          },
        })
      ).unwrap();
      toast.success("Projet mis à jour avec succès !");
      handleClose();
    } catch (err) {
      toast.error(err || "Erreur de mise à jour");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-light p-1 text-muted border-0"
        onClick={handleShow}
        title="Modifier le projet"
      >
        <IconEdit size={15} />
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered size="lg">
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="fw-bold fs-5 text-dark">Modifier la fiche projet</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Titre du projet</Form.Label>
              <Form.Control
                type="text"
                name="nameproduct"
                value={edited.nameproduct}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Accroche / Tagline</Form.Label>
              <Form.Control
                type="text"
                name="tagline"
                value={edited.tagline}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Catégorie</Form.Label>
                <Form.Select name="category" value={edited.category} onChange={handleChange}>
                  <option value="Web Fullstack">Web Fullstack</option>
                  <option value="IA & Machine Learning">IA & Machine Learning</option>
                  <option value="Mobile & Applications">Mobile & Applications</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="Cybersécurité">Cybersécurité</option>
                  <option value="IoT & Embarqué">IoT & Embarqué</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Statut</Form.Label>
                <Form.Select name="status" value={edited.status} onChange={handleChange}>
                  <option value="Prototype">Prototype</option>
                  <option value="Bêta">Bêta</option>
                  <option value="En ligne">En ligne</option>
                  <option value="Recherche de contributeurs">Recherche de contributeurs</option>
                </Form.Select>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Technologies (virgules)</Form.Label>
              <Form.Control
                type="text"
                name="technologies"
                value={edited.technologies}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Lien GitHub</Form.Label>
                <Form.Control
                  type="url"
                  name="githubUrl"
                  value={edited.githubUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Lien Démo</Form.Label>
                <Form.Control
                  type="url"
                  name="demoUrl"
                  value={edited.demoUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Image URL</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={edited.img}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="fw-semibold small text-dark">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={edited.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-top px-4 py-3">
            <Button variant="light" className="btn-outline-pro" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" className="btn-dev-submit">
              Sauvegarder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditProduct;
