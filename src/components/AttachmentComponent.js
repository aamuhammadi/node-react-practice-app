import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";
import { AuthContext } from "../context/auth";
import setAuthToken from "../utils/setAuthToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { truncateFileName } from "../utils/Helper";

const AttachmentComponent = () => {
  const token = localStorage.getItem("token");

  const { userData, fetchUserInfo } = useContext(AuthContext);

  const [attachments, setAttachments] = useState([]);

  const MAX_ATTACHMENTS = 5;
  const MAX_FILE_SIZE_MB = 50;

  const handleAttachments = (e) => {
    const files = e.target.files;
    if (files?.length > MAX_ATTACHMENTS) {
      message.error(`You can only attach up to ${MAX_ATTACHMENTS} files.`);
      e.target.value = null;
      return;
    }

    for (let i = 0; i < files?.length; i++) {
      if (files[i].size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        message.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
        e.target.value = null;
        return;
      }
    }

    setAttachments(files);
  };

  const upload = async () => {
    try {
      if (attachments.length === 0) {
        message.error("Please attach files");
        return;
      }
      const formData = new FormData();

      for (let i = 0; i < attachments?.length; i++) {
        formData.append("attachments", attachments[i]);
      }

      await axios.put("http://localhost:8080/api/user/attachments", formData);
      message.success("Attachments uploaded successfully.");
      const fileInput = document.getElementById("formBasicAttachment");
      if (fileInput) {
        fileInput.value = "";
      }
      fetchUserInfo(token);
      setAttachments([]);
    } catch (err) {
      message.error(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchUserInfo(token);
    }
  }, []);

  const handleDownloadAttachment = async (fn, fp) => {
    try {
      const filepath = fp.replace(/^src\/data\//, "");

      const url = `http://localhost:8080/api/user/download/${filepath}`;

      const res = await axios.get(url, { responseType: "blob" });

      if (res.status !== 200) {
        message.error(`Error downloading file: ${res.status}`);
        return;
      }

      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const link = document.createElement("a");
      link.download = fn;
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      message.error(err?.response?.data?.message);
      console.log(err);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="shadow p-4 rounded">
            <h2 className="text-center mb-4">Attachment Component</h2>
            <Form.Group controlId="formBasicAttachment">
              <Form.Label>Upload Attachment</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleAttachments}
                // accept=".pdf, .doc, .docx" // Define accepted file types
              />
              <Button variant="primary" className="w-100 mt-3" onClick={upload}>
                Upload
              </Button>
            </Form.Group>

            {userData?.attachments?.length > 0 && (
              <div>
                <p>
                  {userData?.attachments?.length === 1
                    ? "Uploaded Attachment:"
                    : "Uploaded Attachments:"}
                </p>
                {userData?.attachments?.map((a, i) => (
                  <div
                    key={i}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <p className="flex-grow-1 mb-0">
                      {truncateFileName(a.filename, 25)}
                    </p>
                    <Button
                      variant="success"
                      className="mt-3"
                      onClick={() =>
                        handleDownloadAttachment(a?.filename, a?.filePath)
                      }
                    >
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AttachmentComponent;
