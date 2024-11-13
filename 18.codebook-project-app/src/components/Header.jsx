import React from 'react';
import Logo from "../assets/images/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';


export default function Header() 
{
  function abc()
  {
    
  }
  return (
    <div>
      <header>
        <nav>
          
            <div className='row justify-space-between  shadow-lg rounded-5'> 
              <div className='col'>
                <a className='d-flex align-items-center mx-auto text-decoration-none' href=''> 
                  <img src={Logo} style={{ width: '25%', height: 'auto' }} alt='Logo' className='mr-4'></img> 
                  <span className="text-dark" style={{marginLeft:"5px",fontSize:"25px"}}>CodeBook</span> 
                </a>
              </div>
              <div className='col-6 d-flex justify-content-end m-auto' onClick={abc}>
              <i className="fa-solid fa-magnifying-glass mx-2" onClick={abc}></i>
              <i className="fa-solid fa-cart-shopping mx-3" onClick={abc}></i>
              <i className="fa-solid fa-user mx-3" onClick={abc}></i>
              </div>
            </div>
        
        </nav>
      </header>
    </div>
  );
}
