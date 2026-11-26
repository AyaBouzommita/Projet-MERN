import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { edituser } from "../redux/userSlice";
import { toast } from "react-toastify";
import { IconEdit } from "./common/Icons";

function Edituser({ el }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEdited({
      name: el?.name || "",
      img: el?.img || "",
      age: el?.age || 25,
      email: el?.email || "",
      isAdmin: Boolean(el?.isAdmin),
    });
    setShow(true);
  };

  const [edited, setEdited] = useState({
    name: el?.name || "",
    img: el?.img || "",
    age: el?.age || 25,
    email: el?.email || "",
    isAdmin: Boolean(el?.isAdmin),
  });

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        edituser({
          id: el?._id,
          edited: {
            ...edited,
            age: Number(edited.age),
            isAdmin: String(edited.isAdmin) === "true",
          },
        })
      ).unwrap();
      toast.success("Profil mis à jour");
      handleClose();
    } catch (err) {
      toast.error(err || "Erreur lors de la modification");
    }
  };

  return (
    <>
      <Button variant="light" size="sm" onClick={handleShow} className="btn-outline-pro flex-grow-1 d-flex align-items-center justify-content-center gap-1">
        <IconEdit size={14} />
        <span>Modifier</span>
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold fs-5 text-dark">Modifier le collaborateur</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Nom et prénom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={edited.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Email professionnel</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={edited.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Âge</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={edited.age}
                  onChange={handleChange}
                  min="18"
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Rôle d'administration</Form.Label>
                <Form.Select
                  name="isAdmin"
                  value={edited.isAdmin}
                  onChange={(e) =>
                    setEdited({ ...edited, isAdmin: e.target.value === "true" })
                  }
                >
                  <option value="false">Collaborateur standard</option>
                  <option value="true">Administrateur</option>
                </Form.Select>
              </div>
            </div>

            <Form.Group className="mb-2">
              <Form.Label className="fw-semibold small text-dark">URL Photo de profil</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={edited.img}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-top px-4 py-3">
            <Button variant="light" className="btn-outline-pro" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" className="btn-primary-pro">
              Sauvegarder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Edituser;
