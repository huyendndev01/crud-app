import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DeletePost } from "../services/userService";
import { toast } from "react-toastify";

const ModaleDeleteUser = (props) => {
  const {
    show,
    handleCloseDeleteModal,
    dataUserDelete,
    updateTableDeleteModal,
  } = props;

  const handleDelete = async () => {
    // const res = await DeletePost(dataUserDelete.id);
    // console.log(res);
    updateTableDeleteModal({
      id: dataUserDelete.id,
      name: dataUserDelete.first_name,
    });
    handleCloseDeleteModal();
    toast.success("Delete success!");
  };

  return (
    <div>
      <Modal show={show} onHide={handleCloseDeleteModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete <strong>{`${dataUserDelete.email}`}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModaleDeleteUser;
