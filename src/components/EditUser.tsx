import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';

const EditUser = ({ editModal, closeEditModal, selectedUser }) => {
  const [editedUser, setEditedUser] = useState({
    name: '',
    fullName: '',
    gender: '',
    isMarried: false,
    country: '',
  });

  useEffect(() => {
    setEditedUser(selectedUser || {
      name: '',
      fullName: '',
      gender: '',
      isMarried: false,
      country: '',
    });
  }, [selectedUser]);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.put(`http://localhost:3000/api/users/${editedUser.id}`, editedUser);
      alert('User updated successfully');
      closeEditModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal show={editModal} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={editedUser.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="form-select w-auto"
              value={editedUser.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isMarried"
              name="isMarried"
              checked={editedUser.isMarried}
              onChange={handleInputChange}
            />
            <label htmlFor="isMarried" className="form-check-label">
              Is Married
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              value={editedUser.country}
              onChange={handleInputChange}
            />
          </div>
          <Button variant="primary" type="submit">Save</Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeEditModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUser;
