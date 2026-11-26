import React, { useState } from "react";
import { Card, Button, Badge, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteuser } from "../redux/userSlice";
import Edituser from "./Edituser";
import { toast } from "react-toastify";

function UserCard({ el }) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteuser(el?._id)).unwrap();
      toast.success(`Utilisateur "${el?.name}" supprimé !`);
    } catch (err) {
      toast.error(err || "Erreur lors de la suppression");
    } finally {
      setShowConfirm(false);
    }
  };

  const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

  return (
    <>
      <Card className="user-card h-100 shadow-sm border-0 rounded-4 text-center p-3">
        <div className="position-relative mx-auto mt-2">
          <img
            src={el?.img || defaultAvatar}
            alt={el?.name}
            className="rounded-circle user-avatar border border-3 border-light shadow-sm"
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
          <Badge
            bg={el?.isAdmin ? "danger" : "primary"}
            className="position-absolute bottom-0 end-0 px-2 py-1 shadow-sm"
          >
            {el?.isAdmin ? "Admin" : "Membre"}
          </Badge>
        </div>

        <Card.Body className="d-flex flex-column pt-3 pb-0 px-2">
          <Card.Title className="fw-bold fs-5 mb-1 text-dark text-truncate">{el?.name}</Card.Title>
          <Card.Subtitle className="text-muted small mb-2 text-truncate">{el?.email}</Card.Subtitle>

          <div className="d-flex justify-content-center gap-3 my-2 py-2 bg-light rounded-3 small">
            <div>
              <span className="text-muted d-block">Âge</span>
              <strong>{el?.age || "N/A"} ans</strong>
            </div>
            <div className="border-start"></div>
            <div>
              <span className="text-muted d-block">Statut</span>
              <strong className="text-success">Actif</strong>
            </div>
          </div>

          <div className="d-flex gap-2 mt-auto pt-3">
            <Edituser el={el} />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setShowConfirm(true)}
              title="Supprimer l'utilisateur"
            >
              🗑️
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 fw-bold">Confirmer suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-3">
          <p className="mb-1">Supprimer définitivement cet utilisateur ?</p>
          <strong className="text-danger">{el?.name}</strong>
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0 pt-0">
          <Button variant="secondary" size="sm" onClick={() => setShowConfirm(false)}>
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

export default UserCard;
