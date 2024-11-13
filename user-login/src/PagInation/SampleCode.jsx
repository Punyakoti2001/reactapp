import React, { useContext, useEffect, useState } from 'react';
import DashboardServices from '../Services/DashboardServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserContext from '..';
import PagInation from './PagInation';

export default function SampleCode() {
  const { editUser, setEditUser, users } = useContext(UserContext);
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [currentPage, postPerPage]); // Trigger fetchUsers when currentPage or postPerPage changes

  async function fetchUsers() {
    try {
      const resp = await DashboardServices.fetchAllUsers(1030);
      if (resp.data.length !== 0) {
        setListUsers(resp.data);
      } else {
        toast.success("No data");
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  }

  function edit(user) {
    setEditUser(user);
    navigate("/admin/editUser");
  }

  async function deleteUser(user) {
    try {
      await DashboardServices.deleteUser(user.userId);
      toast.success("Deleted Successfully");
      fetchUsers(); // Fetch users after deletion
    } catch (err) {
      toast.error("Something Error try again...");
    }
  }

  // Calculate indexes of posts to display
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = listUsers.slice(firstPostIndex, lastPostIndex);

  return (
    <main style={{ marginTop: "60px", marginLeft: "160px" }} className='me-2'>
      <h2 className='text-center'>Employees</h2>
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
          {currentPosts.map(user => (
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
      {listUsers.length>postPerPage && <PagInation postPerPage={postPerPage} totalPosts={listUsers.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
      <ul></ul>
    </main>
  );
}
