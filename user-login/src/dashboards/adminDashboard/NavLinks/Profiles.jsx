import React, { useContext, useEffect, useRef, useState } from 'react';
import DashboardServices from '../../../Services/DashboardServices';
import { toast } from 'react-toastify';
import UserContext from '../../..';
import { useNavigate } from 'react-router-dom';
import "../AdminSideBar.css"

export default function Profiles() {
  const { editUser, setEditUser, users } = useContext(UserContext);
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2); 
  const navigate = useNavigate();


  const searchRef = useRef()
  async function fetchUsers() {
    try {
      const resp = await DashboardServices.fetchAllUsers(users.userId);
      
        setListUsers(resp.data);
       if(resp.data.length ==0) {
        toast.success("No data");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  }

  useEffect(() => {
    fetchUsers();

    
  }, []);

  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = listUsers.slice(indexOfFirstUser, indexOfLastUser);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function edit(user) {
    setEditUser(user);
    navigate("/admin/editUser");
  }

  async function deleteUser(user) {
    try {
      await DashboardServices.deleteUser(user.userId);
      toast.success("Deleted Successfully");
      fetchUsers(); 
    } catch (err) {
      toast.error("Something Error try again...");
    }
  }

  return (
    <main style={{ marginTop: "60px", marginLeft: "160px" }} className='me-2'>
      <div class='d-flex justify-content-between my-2'>
  <div class='d-flex justify-content-between w-25 border border-black cont-rad' >
    <input type='text' rel={searchRef}  class='align-self-start rounded-5 border-0 my-auto h-100 ms-2' style={{outline: '0px'}}></input>
    <button className='btn border  btn-dark' ><i class="bi bi-search"></i></button>
  </div> 
  <h2 class='text-center align-center' >Employees</h2>
  <h1></h1>
</div>

     
      <table className='table border table-striped table-hover'>
        <thead>
          <tr>
            <th width={100} className='text-center'>User ID</th>
            <th width={100} className='text-center'>First Name</th>
            <th width={100} className='text-center'>Last Name</th>
            <th width={100} className='text-center'>Email</th>
            <th width={100} className='text-center'>Designation</th>
            <th width={100} className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.userId}>
              <td width={100} className='text-center'>{user.userId}</td>
              <td width={100} className='text-center'>{user.firstName}</td>
              <td width={100} className='text-center'>{user.lastName}</td>
              <td width={100} className='text-center'>{user.email}</td>
              <td width={100} className='text-center'>{user.role}</td>
              <td>
                <button onClick={() => edit(user)} className='btn rounded mx-3'>
                  <i className="bi bi-pencil-square text-primary "></i>
                </button>
                <button onClick={() => deleteUser(user)} className='btn rounded'>
                  <i className="bi bi-trash text-danger"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <ul className="pagination justify-content-center">
        {listUsers.length > usersPerPage && 
        Array.from({ length: Math.ceil(listUsers.length / usersPerPage) }, (_, i) => 
        (
           <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
           </li>
        ))}
      </ul>
    </main>
  );
}
