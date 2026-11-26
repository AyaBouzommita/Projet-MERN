import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addproduct } from "../../redux/productSlice";
import { toast } from "react-toastify";
import { IconPlus, IconRocket } from "../common/Icons";

function AddProduct() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [projectData, setProjectData] = useState({
    nameproduct: "",
    tagline: "",
    description: "",
    category: "Web Fullstack",
    technologies: "React, Node.js, MongoDB",
    img: "",
    githubUrl: "https://github.com",
    demoUrl: "",
    status: "Bêta",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectData.nameproduct || !projectData.description) {
      toast.error("Le titre et la description du projet sont obligatoires");
      return;
    }

    try {
      await dispatch(
        addproduct({
          ...projectData,
          authorName: user?.name || "Aya Bouzommita",
          authorAvatar: user?.img || undefined,
        })
      ).unwrap();
      toast.success("Projet publié sur DevShowcase !");
      setProjectData({
        nameproduct: "",
        tagline: "",
        description: "",
        category: "Web Fullstack",
        technologies: "React, Node.js, MongoDB",
        img: "",
        githubUrl: "https://github.com",
        demoUrl: "",
        status: "Bêta",
      });
      handleClose();
    } catch (err) {
      toast.error(err || "Erreur lors de la publication");
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="btn-dev-submit d-flex align-items-center gap-2">
        <IconPlus size={16} />
        <span>Publier un projet</span>
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered size="lg">
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="fw-bold fs-5 text-dark d-flex align-items-center gap-2">
            <IconRocket size={20} className="text-primary" />
            <span>Soumettre un Projet Étudiant sur DevShowcase</span>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Titre du projet *</Form.Label>
              <Form.Control
                type="text"
                name="nameproduct"
                placeholder="Ex: EduPulse — Système de QCM en temps réel"
                value={projectData.nameproduct}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Accroche / Tagline (1 phrase) *</Form.Label>
              <Form.Control
                type="text"
                name="tagline"
                placeholder="Ex: Engagez les étudiants en amphi avec des sondages interactifs en direct."
                value={projectData.tagline}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Domaine / Catégorie</Form.Label>
                <Form.Select name="category" value={projectData.category} onChange={handleChange}>
                  <option value="Web Fullstack">Web Fullstack</option>
                  <option value="IA & Machine Learning">IA & Machine Learning</option>
                  <option value="Mobile & Applications">Mobile & Applications</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="Cybersécurité">Cybersécurité</option>
                  <option value="IoT & Embarqué">IoT & Embarqué</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Statut actuel du projet</Form.Label>
                <Form.Select name="status" value={projectData.status} onChange={handleChange}>
                  <option value="Prototype">Prototype</option>
                  <option value="Bêta">Bêta</option>
                  <option value="En ligne">En ligne (Live)</option>
                  <option value="Recherche de contributeurs">Recherche de contributeurs</option>
                </Form.Select>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Stack & Technologies (séparées par des virgules)</Form.Label>
              <Form.Control
                type="text"
                name="technologies"
                placeholder="Ex: React, Node.js, Socket.io, MongoDB, Docker"
                value={projectData.technologies}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Lien GitHub (Code source)</Form.Label>
                <Form.Control
                  type="url"
                  name="githubUrl"
                  placeholder="https://github.com/..."
                  value={projectData.githubUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Lien Démo en ligne (Optionnel)</Form.Label>
                <Form.Control
                  type="url"
                  name="demoUrl"
                  placeholder="https://votre-projet.vercel.app"
                  value={projectData.demoUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Capture d'écran / Image du projet (URL)</Form.Label>
              <Form.Control
                type="text"
                name="img"
                placeholder="https://images.unsplash.com/..."
                value={projectData.img}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="fw-semibold small text-dark">Description détaillée du projet *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Expliquez la problématique résolue, l'architecture choisie, les fonctionnalités clés..."
                value={projectData.description}
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
              Publier le projet
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddProduct;
