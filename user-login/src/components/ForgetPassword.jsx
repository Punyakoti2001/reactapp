import React, { useRef, useState } from 'react' 
import LoginService from '../Services/LoginService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function ForgetPassword()
{
    let navigate =useNavigate()
   let emailRef = useRef()

   let [enableButton,setEnableButton] =useState(false)

  async function checkEmail()
   {    
    if(!emailRef.current.value.trim())
    {
      toast.error("Enter the mail Id")
      return
    }

    await LoginService.checkEmail(emailRef.current.value.trim())
    .then(resp=>{
      if(resp.status===200)
      {
        toast.success("Correct Email")
        setEnableButton(true)
      }
    })
    .catch(err=>
    {
      toast.error("Invalid Email ID")
    })
   }
   
   async function sendEmail()
   {
    try
    {
        let resp = await LoginService.sendEmail(emailRef.current.value)
        if(resp.status==200)
        {
            toast.success("Email Sent to the respective Id")
            navigate("/login")
        }

    }
    catch(err)
    {
        toast.error("Some Error Occured...")
    }
   }



   function forgetPasswordBox() {
    return (
        <Modal show={true} >
            <Modal.Header closeButton onClick={()=>{navigate("/")}}>
                <Modal.Title>Forget Password</Modal.Title>
                {/* <Modal.Title className='text-danger' id='warn'></Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <table>
                    <tbody>
                        <tr>
                            <td>
                            <label htmlFor='Email' className='mx-5' >Email</label>
                            </td>
                            <td>
                            <input type='text' placeholder='Enter the email' className='form-control form-control' ref={emailRef} onBlur={checkEmail}  autoFocus></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
           
        
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary">Cancel</Button> */}
                <Button type="button" className="btn btn-primary" disabled={!enableButton} onClick={sendEmail}>Send</Button>
            </Modal.Footer>
        </Modal>
    )
   }

  return (
    <div>
      {forgetPasswordBox()}
    </div>
  )
}
