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
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
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
        const formData = new FormData();
        formData.append("attachments", image);
        formData.append("firstName", userData.firstName);
        formData.append("lastName", userData.lastName);
        formData.append("email", userData.email);
        formData.append("phone", userData.phone);
        formData.append("address", userData.address);

        const res = await axios.put(
          "http://localhost:8080/api/user/update",
          formData
        );

        message.success(res.data.message);
        fetchUserInfo(token);
        setImage(null);
        setPreviewImage(null);
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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }

    setImage(selectedImage);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="shadow p-4 rounded">
            <h2 className="text-center mb-4">User Profile</h2>
            <div className="text-center mb-3">
              {/* Container for the profile image */}
              <div
                style={{
                  width: "150px", // Adjust the width as needed
                  height: "150px", // Adjust the height as needed
                  overflow: "hidden",
                  borderRadius: "50%",
                  margin: "auto",
                }}
              >
                {userData?.profileImage?.filePath && (
                  <img
                    src={`http://localhost:8080/${userData?.profileImage?.filePath}`}
                    alt="Profile Preview"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            </div>

            <Form.Group controlId="formBasicImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={!isEditing}
              />
              {previewImage && (
                <img
                  style={{
                    width: "100px", // Adjust the width as needed
                    height: "100px", // Adjust the height as needed
                    overflow: "hidden",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                  src={previewImage}
                  alt="Profile Preview"
                  className="img-fluid mt-2"
                />
              )}
            </Form.Group>

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
