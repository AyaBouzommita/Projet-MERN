import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteuser } from "../redux/userSlice";
import Edituser from "./Edituser";
import { toast } from "react-toastify";
import { IconTrash } from "./common/Icons";

function UserCard({ el }) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteuser(el?._id)).unwrap();
      toast.success(`Compte "${el?.name}" supprimé`);
    } catch (err) {
      toast.error(err || "Erreur de suppression");
    } finally {
      setShowConfirm(false);
    }
  };

  const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

  return (
    <>
      <div className="pro-user-card text-center">
        <div className="mx-auto mb-3">
          <img
            src={el?.img || defaultAvatar}
            alt={el?.name}
            className="pro-user-avatar"
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
        </div>

        <h5 className="fw-bold text-dark mb-1 text-truncate" title={el?.name}>
          {el?.name}
        </h5>
        <div className="text-muted small mb-3 text-truncate" title={el?.email}>
          {el?.email}
        </div>

        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          <span className={`badge-status ${el?.isAdmin ? "badge-admin" : "badge-member"}`}>
            <span className="badge-status-dot" style={{ backgroundColor: el?.isAdmin ? "#0f172a" : "#2563eb" }}></span>
            {el?.isAdmin ? "Administrateur" : "Collaborateur"}
          </span>
          <span className="text-muted small">• {el?.age || 25} ans</span>
        </div>

        <div className="d-flex gap-2 mt-auto pt-3 border-top">
          <Edituser el={el} />
          <Button
            variant="light"
            size="sm"
            className="btn-outline-pro px-2"
            onClick={() => setShowConfirm(true)}
            title="Supprimer le collaborateur"
          >
            <IconTrash size={15} />
          </Button>
        </div>
      </div>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered size="sm">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fs-6 fw-bold text-dark">Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3 text-muted small">
          Confirmez-vous le retrait de cet utilisateur du système ?
          <div className="fw-bold text-dark mt-2">{el?.name}</div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" size="sm" className="btn-outline-pro" onClick={() => setShowConfirm(false)}>
            Annuler
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete} className="px-3">
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserCard;
