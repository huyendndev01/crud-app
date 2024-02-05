import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { userService } from "../services/userService";

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const res = await userService("https://reqres.in/api/users?page=1");

    if (res && res.data && res.data.data) {
      setListUsers(res.data.data);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th># Id</th>
          <th>Avatar</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
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
                  />
                </td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default TableUsers;
