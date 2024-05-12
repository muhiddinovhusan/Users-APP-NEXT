"use client"
import React, { useEffect, useState } from 'react'
import { GET } from '../api/users/route'
import AddUser from '@/components/AddUser';
import { DELETE } from '../api/users/[id]/route';

const page = () => {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET();
        const data = await response.json();
        console.log(data)
        setUsers(data.users);
      } catch (error) {
        console.error('', error);
      }
    };

    fetchData();
  }, []);
  console.log(users)


  const handleDelete = async (id) => {
    try {
      const response = await DELETE(id);
      if (response.status === 200) {
        console.log('User deleted successfully');
        
      } else {
        console.error('Failed to delete user:', response.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
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
            users.map((user: {
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
                <td></td>
                <td>{user.country}</td>
                <td>{user.isMarried ? "true" : "false"}</td>
                <td className='flex gap-2'>
                  <button className='btn btn-danger' onClick={()=> handleDelete(user.id)}>Delete</button>
                  <button className='btn btn-warning'>Edit</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <AddUser modal={modal} closeModal={closeModal}  />


    </div>
  )
}

export default page