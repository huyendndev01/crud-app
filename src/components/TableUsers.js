import _, { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import "../App.scss";
import { fetchAllUsers } from "../services/userService";
import ModalAddNewUser from "./ModalAddNewUser";
import ModaleDeleteUser from "./ModalDelete";
import ModalEditUser from "./ModalEditUser";

const TableUsers = () => {
  const [show, setShow] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showEditModal, setShowEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [showDeleteModal, setShowDeleteUser] = useState(false);
  const [dataUserDelete, setDataUserDeltete] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  useEffect(() => {
    getUsers(1);
  }, []);
  const getUsers = async (page) => {
    const res = await fetchAllUsers(page);

    if (res && res.data) {
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };

  const handleOpenModalEdit = (user) => {
    setDataUserEdit(user);
    setShowEditUser(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseModalEdit = () => {
    setShowEditUser(false);
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleCreateUser = (user) => {
    setListUsers((prev) => [user, ...prev]);
  };

  const updateTableEditModal = (user) => {
    const cloneListUser = _.cloneDeep(listUsers);

    const item = cloneListUser.find((item) => item.id === user.id);
    item.first_name = user.name;
    item.email = user.email;
    // console.log(listUsers, cloneListUser);
    setListUsers(cloneListUser);
  };

  const updateTableDeleteModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);

    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    // console.log(listUsers, cloneListUser);
    setListUsers(cloneListUser);
  };

  const handleShowDeleteModal = (user) => {
    setDataUserDeltete(user);
    setShowDeleteUser(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteUser(false);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);

    setListUsers(cloneListUser);
  };

  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneListUser = _.cloneDeep(listUsers);

      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));

      setListUsers(cloneListUser);
    } else {
      getUsers(1);
    }
  }, 500);

  return (
    <>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <strong>List User:</strong>
        <button className="btn btn-success" onClick={handleShow}>
          Add new user
        </button>
      </div>
      <div className="my-3 col-12">
        <input
          className="col-12 col-sm-4"
          onChange={(e) => handleSearch(e)}
          placeholder="Search by email..."
        />
      </div>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="idSorted d-flex justify-content-between align-items-center">
                <span># Id</span>
                <span>
                  <i
                    className="pr-1 cursor-pointer fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "id")}
                    className="cursor-pointer fa-solid fa-arrow-up-long"
                  ></i>
                </span>
              </div>
            </th>
            <th>Avatar</th>
            <th>
              <span>Email</span>
            </th>
            <th>
              <div className="idSorted d-flex justify-content-between align-items-center">
                <span>First Name</span>
                <span>
                  <i
                    className="pr-1 cursor-pointer fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "first_name")}
                    className="cursor-pointer fa-solid fa-arrow-up-long"
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th style={{ textAlign: "center" }}>Edit</th>
            <th style={{ textAlign: "center" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      style={{
                        height: "50px",
                        borderRadius: "10px",
                        marginLeft: "5px",
                      }}
                      src={user.avatar}
                      alt="avatar"
                    />
                  </td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td
                    style={{ cursor: "pointer", textAlign: "center" }}
                    onClick={() => handleOpenModalEdit(user)}
                  >
                    <i
                      onClick={() => handleOpenModalEdit(user)}
                      className="fa-solid fa-pencil"
                    ></i>
                  </td>
                  <td
                    onClick={() => handleShowDeleteModal(user)}
                    style={{ cursor: "pointer", textAlign: "center" }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          containerClassName="pagination"
          activeLinkClassName="active"
        />
      </div>
      <ModalAddNewUser
        show={show}
        handleClose={handleClose}
        handleCreateUser={handleCreateUser}
      />
      <ModalEditUser
        show={showEditModal}
        handleCloseModalEdit={handleCloseModalEdit}
        dataUserEdit={dataUserEdit}
        updateTableEditModal={updateTableEditModal}
      />
      <ModaleDeleteUser
        show={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        dataUserDelete={dataUserDelete}
        updateTableDeleteModal={updateTableDeleteModal}
      />
    </>
  );
};

export default TableUsers;
