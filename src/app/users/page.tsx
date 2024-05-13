"use client"
import React, { useEffect, useState } from 'react'
import { GET } from '../api/users/route'
import AddUser from '@/components/AddUser';
import { DELETE } from '../api/users/[id]/route';
import EditUser from '@/components/EditUser';

const page = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<any[]>([]);
const [editModal , setEditModal] = useState(false)
const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const res = await fetch('http://localhost:3000/api/users');
          if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const jsonData = await res.json();
          setData(jsonData.users);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  const handleEdit = (userId: number) => {
    const selectedUser = data.find(user => user.id === userId);
    setSelectedStudent(selectedUser);
    setEditModal(true);
    console.log(selectedUser)
  };


  const handleDelete = async (userId: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      alert('User deleted')
      fetchData();
      console.log(`User with ID ${userId} has been deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  



  

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };
  return (
    <div className='container py-3'>
      <div>
        <div className='w-100 flex'>
          <input type="text" placeholder='Search' className='form-control p-2' />
          <select name="filter" id="filter" className='form-select w-auto' >
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </select>
          <button className='btn btn-outline-success w-auto' onClick={openModal}>Add</button>

        </div>
      </div>


      <table className='table'>
        <thead>
          <tr >
            <th>#</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Gender</th>
            <th>Country</th>
            <th>IsMarried</th>
            <th></th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {
          data && data.length>0 &&   data.map((user: {
              id: number;
              name: string;
              fullName: string;
              country: string;
              gender: string;
              isMarried: boolean;
            }, i) => (
              <tr key={i}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.fullName}</td>
                <td>{user.gender}</td>
                <td>{user.country}</td>
                <td>{user.isMarried ? "true" : "false"}</td>
                <td className='flex gap-2'>
                  <button className='btn btn-danger' onClick={()=> handleDelete(user.id)}>Delete</button>
                  <button className='btn btn-warning' onClick={()=>handleEdit(user.id)}>Edit</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <AddUser modal={modal} closeModal={closeModal}  />
      <EditUser editModal={editModal} closeEditModal={closeEditModal} selectedUser= {selectedStudent}  />


    </div>
  )
}

export default page