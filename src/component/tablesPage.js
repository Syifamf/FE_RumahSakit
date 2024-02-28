import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import "../CSS/style.css";

const Data = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

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
    <div>
      <Table className="my-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pasien</th>
            <th>Tanggal Lahir</th>
            <th>Gender</th>
            <th>Nama Dokter</th>
            <th>Diagnosa</th>
            <th>Obat</th>
            <th>Aksi</th>
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
                <Button variant="info" onClick={() => handleUpdate(item.id)}>
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Formulir Update */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Menampilkan data yang sudah ada di dalam formulir */}
            <Form.Group controlId="formNamaPasien">
              <Form.Label>Nama Pasien</Form.Label>
              <Form.Control
                type="text"
                value={selectedData?.namaPasien || ""}
                onChange={(e) => handleFormChange("namaPasien", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTanggalLahir">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                value={selectedData?.tanggalLahir || ""}
                onChange={(e) =>
                  handleFormChange("tanggalLahir", e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
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
              <Form.Label>Nama Dokter</Form.Label>
              <Form.Control
                type="text"
                value={selectedData?.namaDokter || ""}
                onChange={(e) => handleFormChange("namaDokter", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDiagnosa">
              <Form.Label>Diagnosa</Form.Label>
              <Form.Control
                type="text"
                value={selectedData?.diagnosa || ""}
                onChange={(e) => handleFormChange("diagnosa", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formObat">
              <Form.Label>Obat</Form.Label>
              <Form.Control
                type="text"
                value={selectedData?.obat || ""}
                onChange={(e) => handleFormChange("obat", e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleFormSubmit}>
              Update Data
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Data;
