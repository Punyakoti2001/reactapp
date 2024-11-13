import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from 'react-router-dom';


const UserContext = createContext();

const Index = () => {
 
  const [users, setUsers] = useState(null);
    let [editUser,setEditUser] = useState(null)
    let [deleteUsers,setDeleteUsers] = useState(null) 
    let [editFun,setEditFun]=useState(false)
    let [create,setCreate] = useState(false)


  return (
    <UserContext.Provider value={{ users, setUsers,editUser,setEditUser,create,setCreate}}>
      <Router>
        <ToastContainer />
        <App />
      </Router>
    </UserContext.Provider>
  );
};

// Render the Index component to the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default UserContext;
