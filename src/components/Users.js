import { message } from "antd";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Pagination from "../utils/Pagination";
import setAuthToken from "../utils/setAuthToken";

const UserList = () => {
  const token = localStorage.getItem("token");
  const { userData, fetchUserInfo, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const page_size = 5;
  const [nextPageCount, setNextPageCount] = useState(page_size);
  const [lastPageItemsCount, setLastPageItemsCount] = useState(page_size);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 0,
  });

  const [users, setUsers] = useState([]);

  if (userData?.userType === "user") {
    navigate("/profile");
  }

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/user/users" +
          `?currentPage=${paginationData.currentPage}&pageSize=${page_size}`
      );
      const data = await res?.data;
      setUsers(data?.users);
      setLastPageItemsCount(res?.data?.meta?.lastPageItemsCount);
      setNextPageCount(res?.data?.meta?.nextPageCount);
      setPaginationData({
        currentPage: res?.data?.meta?.currentPage,
        totalPages: res?.data?.meta?.totalPages,
      });
    } catch (err) {
      message.error(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
    fetchUserInfo();
  }, []);

  const handleDelete = async (userId) => {
    const res = await axios.delete(`http://localhost:8080/api/user/${userId}`);
    message.success(res?.data?.message);
    fetchUsers();
    console.log("Delete user with ID:", userId);
  };

  useEffect(() => {
    fetchUsers();
  }, [paginationData.currentPage]);

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
            <Pagination
              lastPageItemsCount={lastPageItemsCount}
              pageSize={page_size}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
              setNextPageCount={setNextPageCount}
            />{" "}
            <Button
              variant="outline-danger"
              className="w-100 mt-3"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
