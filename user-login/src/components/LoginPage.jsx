import React, { useEffect, useRef, useState } from 'react'
// import LoginService from '../Services/LoginService2';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import LoginService from '../Services/LoginService';
import {NavLink, useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import UserContext from '..';

export default function LoginPage()
 {
  const {users,setUsers} = useContext(UserContext)
  const [unLock,setUnLock] = useState(null);


     let userInput = useRef();
     let passwordInput ;
    
    let navigate = useNavigate()


     let [enable,setEnable] = useState(false)

     let [enablelogin,setEnableLogin] = useState(false)
     
    


     useEffect(()=>
     {
      if(userInput.current.value && passwordInput)
      {
        setEnableLogin(true)
      }
     },[enablelogin])

    // let {register,handleSubmit} =useForm()

     async function handleRef()
     {
      if(!userInput.current.value.trim())
      {
        toast.error("Enter the mail Id")
        return
      }

      await LoginService.checkEmail(userInput.current.value.trim())
      // await LoginService(userInput.current.value.trim())
      .then(resp=>{
        if(resp.status===200)
        {
          toast.success("Correct Email")
          setEnable(true)
        }
      })
      .catch(err=>
      {
        toast.error("Invalid Email ID")
        setEnable(false)
      })
     }

      async function onSubmit(event)
     {
      event.preventDefault()
      try{
        let response = await LoginService.login(userInput.current.value,passwordInput)
        if(response.status===200)
        {
          toast.success("Login Success")
          console.log(response.data.roleId)
          if(response.data.loginStatus===0)
          {
            navigate(`/change-password/${response.data.email}`)
          }
          else{
            console.log(response.data.roleId)

            setUsers(response.data)
              switch(response.data.roleId)
              {
                case 1:
                  navigate("/admin/home")
                  break;
                case 2:
                  navigate("/HR")
                  break;
                case 3:
                  navigate("/manager")
                  break;
                case 4:
                  navigate("/internal-employee")
                  break;
                case 5:
                  navigate("/external-employee")
                  break;
                default:
                  navigate("/page-not-found")
              }
          }
        }

      }catch(err)
      {
        if(err.response.status===404)
        {
          toast.error("Incorect Password")
        }
        if(err.response.status==423)
        {
          // console.log(err.response.data.userId)
          setUnLock(err.response.data.userId)
          toast.error("accountLocked try after some time")
          setTimeout(()=>
          {
            const resp = LoginService.unLock(err.response.data.userId)
          },10000)
// 5 min =300000
        }
      }

     }

  return (
  <div class="container mt-5 h-100">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card h-100 border shadow-lg">
        <div class="card-body my-4 center ">
          <h3 className='text-center'>Login</h3>
          <form onSubmit={onSubmit} class="mt-5 ">
            <div class="mb-3">
              <label for="userName" class="form-label">UserName</label>
              <input type="text" class="form-control" id="userName" ref={userInput} onBlur={handleRef} autoFocus/>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" className="form-control" id="password" required onChange={(event)=>{passwordInput = event.target.value
                                                                                               setEnableLogin(true)}} disabled={!enable} />
            </div>
            <div className='d-flex justify-content-between mx-4'>
            
            <input  type="submit" class="btn btn-primary w-25" value="Log In" disabled={!enablelogin}></input>
            
            <NavLink className=" mx-2 text-decoration-none mt-1" to={"/forget-password"}>Forget Password</NavLink>
            </div>

          </form>
         <div className='mt-5 justify-content-center d-flex '>Not a member ? <NavLink className="text-decoration-none" to={"/"}>signUp</NavLink> </div>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}
