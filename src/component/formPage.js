// Formulir.js

import React, { useState } from "react";
import { Col, Row, Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../CSS/style.css";

const Formulir = ({
  namaPasien,
  tanggalLahir,
  gender,
  namaDokter,
  diagnosa,
  obat,
}) => {
  const [formData, setFormData] = useState({
    namaPasien: "",
    tanggalLahir: "",
    gender: "",
    namaDokter: "",
    diagnosa: "",
    obat: "",
  });

  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/pasiens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setSuccessAlert(true); // Tampilkan pemberitahuan berhasil
        setErrorAlert(null); // Reset pemberitahuan error
        setFormData({
          namaPasien: "",
          tanggalLahir: "",
          gender: "",
          namaDokter: "",
          diagnosa: "",
          obat: "",
        });
        window.location.reload(); // Reload halaman setelah berhasil menambahkan data
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorAlert("Gagal melakukan registrasi. Silakan coba lagi."); // Tampilkan pemberitahuan error
        setSuccessAlert(false); // Reset pemberitahuan berhasil
      });
  };

  return (
    <div className="form" id="register">
      <Container>
        <Row className="subhead-form mt-5" id="register">
          <Col>
            <h4 className="fw-bold">Register Patient</h4>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col className="alert" md={6}>
            {successAlert && (
              <Alert
                variant="success"
                onClose={() => setSuccessAlert(false)}
                dismissible
              >
                Registrasi berhasil! Data pasien telah disimpan.
              </Alert>
            )}

            {errorAlert && (
              <Alert
                variant="danger"
                onClose={() => setErrorAlert(null)}
                dismissible
              >
                {errorAlert}
              </Alert>
            )}
          </Col>

          <Form className="form-container" onSubmit={handleSubmit}>
            <Form.Group controlId="namaPasien">
              <Form.Label className="form-label">Patient's name : </Form.Label>
              <Form.Control
                type="text"
                name="namaPasien"
                value={namaPasien}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="tanggalLahir">
              <Form.Label className="form-label">Date of birth : </Form.Label>
              <Form.Control
                className="form-isi"
                type="date"
                name="tanggalLahir"
                value={tanggalLahir}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label className="form-label">Gender : </Form.Label>
              <Form.Control
                as="select"
                custom
                name="gender"
                value={gender}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="namaDokter">
              <Form.Label className="form-label"> Doctor's name: </Form.Label>
              <Form.Control
                type="text"
                name="namaDokter"
                value={namaDokter}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="diagnosa">
              <Form.Label className="form-label">Diagnosis : </Form.Label>
              <Form.Control
                type="text"
                name="diagnosa"
                value={diagnosa}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="obat">
              <Form.Label className="form-label">Drug : </Form.Label>
              <Form.Control
                type="text"
                name="obat"
                value={obat}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              style={{ border: "1px solid white " }}
            >
              Register
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default Formulir;
