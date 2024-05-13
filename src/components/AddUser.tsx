import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const AddUser = ({ modal , closeModal }:{
  modal:any, closeModal:any
}) => {
 const [data, setData ]=useState({
  name:'',
  fullName:'',
  gender:'All',
  isMarried: false,
  country:''
 })


  const handleChange = (e ) => {
setData({
  ...data,
  [e.target.id]:e.target.value
})

  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users', data);
      if (response.status === 201) {
        alert('User added successfully');
        closeModal();


      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <Modal show={modal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className='mb-3'>
            <label htmlFor='firstName' className='form-label'>First Name</label>
            <input type='text' required className='form-control' id='name' name='name' value={data.name} onChange={handleChange} />
          </div>
          <div className='mb-3'>
            <label htmlFor='lastName' className='form-label'>Last Name</label>
            <input type='text' required className='form-control' id='fullName' name='fullName' value={data.fullName} onChange={handleChange} />
          </div>
          <div className='mb-3'>
            <select name='gender' required id='gender' className='form-select w-auto' value={data.gender} onChange={handleChange}>
              <option value='All'>Select</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
          <div className="mb-3 form-check">
            <input
            required
              type="checkbox"
              className="form-check-input"
              id="isMarried"
              name="isMarried"
              checked={data.isMarried}
              onChange={handleChange}
            />
            <label htmlFor="isMarried" className="form-check-label">
              Is Married
            </label>
          </div>
          <div className='mb-3 form-check'>
            <label htmlFor='number' className='form-label'>Country</label>
            <input type='text' required className='form-control' id='country' name='country' value={data.country} onChange={handleChange} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
        <Button variant='primary' onClick={handleAddUser}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUser;
