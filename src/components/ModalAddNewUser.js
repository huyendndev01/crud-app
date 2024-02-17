import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { CreatePostUser } from "../services/userService";

const ModalAddNewUser = (props) => {
  const { show, handleClose, handleCreateUser } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = async () => {
    if (!name || !email) return toast.warning("Điền đầy đủ các form");
    const obj = { name, email };
    const res = await CreatePostUser(obj);
    console.log(res);
    if (res && res.id) {
      handleClose();
      setEmail("");
      setName("");
      toast.success("A user is created");

      const user = {
        last_name: name,
        email,
        id: res.id,
      };
      handleCreateUser(user);
    } else {
      toast.error("Lỗi API");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddNewUser;
