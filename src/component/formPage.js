// Formulir.js

import React, { useState } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../CSS/style.css"

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
    <div className="mt-5">
      <Row className="form-head-book">
        <Col>
          <h4>Patient Register</h4>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="namaPasien">
              <Form.Label>Nama Pasien : </Form.Label>
              <Form.Control
                type="text"
                name="namaPasien"
                value={namaPasien}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="tanggalLahir">
              <Form.Label>Tanggal Lahir : </Form.Label>
              <Form.Control
                type="date"
                name="tanggalLahir"
                value={tanggalLahir}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender : </Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="namaDokter">
              <Form.Label>Nama Dokter : </Form.Label>
              <Form.Control
                type="text"
                name="namaDokter"
                value={namaDokter}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="diagnosa">
              <Form.Label>Diagnosa : </Form.Label>
              <Form.Control
                type="text"
                name="diagnosa"
                value={diagnosa}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="obat">
              <Form.Label>Obat : </Form.Label>
              <Form.Control
                type="text"
                name="obat"
                value={obat}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Formulir;
