import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";

const AttachmentComponent = () => {
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
    } catch (err) {
      message.error(err?.response?.data?.error);
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

            {/* {attachment && (
              <div>
                <p>Uploaded Attachment:</p>
                <p>{attachment.name}</p>
                <Button
                  variant="success"
                  className="w-100 mt-3"
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </div>
            )} */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AttachmentComponent;
