import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import "../CSS/style.css";

const Data = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [colors] = useState(["#ffcccb", "#a0e57e", "#add8e6"]);

  const handleDelete = (id) => {
    // Logika untuk meng-handle delete data dari database
    // Setelah berhasil, Anda bisa memanggil fetch data lagi untuk meng-update tampilan
    fetch(`http://localhost:8080/api/pasiens/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((result) => {
        console.log("Data deleted:", result);
        // Reload halaman setelah berhasil menghapus data
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleUpdate = (id) => {
    // Cari data yang sesuai dengan id yang dipilih
    const selected = data.find((item) => item.id === id);
    // Set state selectedData dengan data yang dipilih
    setSelectedData(selected);
    // Tampilkan formulir
    setShowForm(true);
  };

  useEffect(() => {
    // Panggil API untuk mengambil data dari database
    fetch("http://localhost:8080/api/pasiens") // Ganti URL dengan URL API Anda
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // [] agar useEffect hanya dijalankan sekali pada saat mounting

  const handleCloseForm = () => {
    // Tutup formulir dan reset state selectedData
    setShowForm(false);
    setSelectedData(null);
  };

  const handleFormChange = (field, value) => {
    // Mengupdate nilai field yang dipilih dalam state selectedData
    setSelectedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFormSubmit = () => {
    // Logika untuk mengirim data yang diubah ke API (menggunakan metode PUT atau PATCH)
    fetch(`http://localhost:8080/api/pasiens/${selectedData.id}`, {
      method: "PUT", // Ganti dengan metode yang sesuai (PUT atau PATCH)
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedData),
      color: colors[data.length % colors.length],
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Updated data:", result);
        // Tutup formulir setelah berhasil mengirim data
        handleCloseForm();
        // Reload halaman atau panggil API untuk mengambil data terbaru
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div className="tables mb-5">
      <Table striped bordered hover variant="success">
        <thead>
          <tr>
            <th>No</th>
            <th>Patient</th>
            <th>Date of birth</th>
            <th>Gender</th>
            <th>Doctor</th>
            <th>Diagnosis</th>
            <th>Drug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.namaPasien}</td>
              <td>{item.tanggalLahir}</td>
              <td>{item.gender}</td>
              <td>{item.namaDokter}</td>
              <td>{item.diagnosa}</td>
              <td>{item.obat}</td>
              <td>
                <Button
                  variant="success"
                  style={{ border: "1px solid white " }}
                  onClick={() => handleUpdate(item.id)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  style={{ border: "1px solid white " }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Formulir Update */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header className="formUp" closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="custom-form">
            {/* Menampilkan data yang sudah ada di dalam formulir */}
            <Form.Group controlId="formNamaPasien">
              <Form.Label>Pasien's name :</Form.Label>
              <Form.Control
                type="text"
                value={selectedData?.namaPasien || ""}
                onChange={(e) => handleFormChange("namaPasien", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTanggalLahir">
              <Form.Label>Date of birth :</Form.Label>
              <Form.Control
                type="date"
                value={selectedData?.tanggalLahir || ""}
                onChange={(e) =>
                  handleFormChange("tanggalLahir", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender :</Form.Label>
              <Form.Control
                as="select"
                value={selectedData?.gender || ""}
                onChange={(e) => handleFormChange("gender", e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNamaDokter">
              <Form.Label>Doctor's name :</Form.Label>
              <Form.Control
                type="text"
                value={selectedData?.namaDokter || ""}
                onChange={(e) => handleFormChange("namaDokter", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDiagnosa">
              <Form.Label>Diagnosis :</Form.Label>
              <Form.Control
                type="text"
                value={selectedData?.diagnosa || ""}
                onChange={(e) => handleFormChange("diagnosa", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formObat">
              <Form.Label>Drug :</Form.Label>
              <Form.Control
                type="text"
                value={selectedData?.obat || ""}
                onChange={(e) => handleFormChange("obat", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="success"
              style={{ border: "1px solid white " }}
              onClick={handleFormSubmit}
            >
              Update Data
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Data;
