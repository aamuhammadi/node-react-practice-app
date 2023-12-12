import { message } from "antd";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { userData, fetchUserInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  if (userData?.userType === "user") {
    navigate("/profile");
  }

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/users");
      const data = await res?.data;
      setUsers(data);
    } catch (err) {
      message.error(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchUserInfo();
  }, []);

  const handleDelete = async (userId) => {
    const res = await axios.delete(`http://localhost:8080/api/user/${userId}`);
    message.success(res?.data?.message);
    fetchUsers();
    console.log("Delete user with ID:", userId);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="shadow p-4 rounded">
            <h2 className="text-center mb-4">User List</h2>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
