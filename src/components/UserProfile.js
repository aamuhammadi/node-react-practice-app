import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/auth";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { message } from "antd";

const UserProfile = () => {
  const { userData, setUserData, fetchUserInfo, logout } =
    useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchUserInfo(token);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      if (isEditing) {
        // Update user profile
        const res = await axios.put(
          "http://localhost:8080/api/user/update",
          userData
        );
        message.success(res.data.message);
        setUserData({});
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="shadow p-4 rounded">
            <h2 className="text-center mb-4">User Profile</h2>

            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={userData.firstName}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={userData.lastName}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={userData.email}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted">
                This is your registered email address.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                value={userData.phone}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={userData.address}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </Form.Group>

            {isEditing && (
              <Form.Group controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  name="password"
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}

            {isEditing ? (
              <>
                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={handleSaveClick}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-3"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  className="w-100 mt-3"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outline-danger"
                  className="w-100 mt-3"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
