import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/auth";
import setAuthToken from "../utils/setAuthToken";

const UserProfile = () => {
  const { userData, setUserData, fetchUserInfo } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchUserInfo();
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Add logic to save the updated user data to the server
    // Example:
    // axios.put("http://localhost:8080/api/user/profile", userData)
    //   .then((res) => {
    //     message.success(res.data.message);
    //     setIsEditing(false);
    //   })
    //   .catch((err) => {
    //     message.error(err.response.data.message);
    //   });
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

            {isEditing ? (
              <Button
                variant="primary"
                className="w-100 mt-3"
                onClick={handleSaveClick}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                className="w-100 mt-3"
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
