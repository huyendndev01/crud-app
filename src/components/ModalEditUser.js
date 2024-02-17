import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { CreatePostUser, EditPostUser } from "../services/userService";

const ModalEditUser = (props) => {
  const { show, handleCloseModalEdit, dataUserEdit, updateTableEditModal } =
    props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSaveEdit = async () => {
    if (!name || !email) return toast.warning("Điền đầy đủ các form");

    const obj = { name, email };
    let idUser = dataUserEdit.id;
    const res = await EditPostUser(obj, idUser);

    if (res && res.updatedAt) {
      handleCloseModalEdit();
      setEmail("");
      setName("");
      updateTableEditModal({
        name: name,
        id: dataUserEdit.id,
        email: email,
      });
      toast.success("Updated was success");
    } else {
      toast.error("Lỗi API");
    }
  };

  useEffect(() => {
    setName(dataUserEdit.last_name);
    setEmail(dataUserEdit.email);
  }, [dataUserEdit]);

  return (
    <div>
      <Modal show={show} onHide={handleCloseModalEdit} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditUser;
