import React, { useRef, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginService from '../Services/LoginService';

export default function ChangePassword() {

    let navigate = useNavigate()
    var PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    let { email } = useParams();

    let [enableButton, setEnableButton] = useState(false);
    let [enable, setEnable] = useState(false);

    let newPasswordRef = useRef();

    function checkPassword() {
        if (PASSWORD_REGEX.test(newPasswordRef.current.value)) {
            setEnable(true);
        } else {
            setEnable(false);
            toast.error("Invalid Password Pattern");
        }
    }

    function comparePassword(event) {
        const confirmPassword = event.target.value;
        if (confirmPassword !== newPasswordRef.current.value) {
            setEnableButton(false);
        } else {
            setEnableButton(true);
        }
    }

   async function savePassword()
    {
        console.log("inside save",email,newPasswordRef.current.value);

        try{
            
            let res = await LoginService.resetPassword(email,newPasswordRef.current.value)

            if(res.status==200)
            {
               navigate("/login")
               toast.success("Updated successfully")
            }
   
        }
        catch(err)
        {
           toast.error(err)
        }
      


    }

    function changePasswordBox() {
        return (
            <Modal show={true} >
                <Modal.Header closeButton onClick={()=>{navigate("/")}}>
                    <Modal.Title>Change Password</Modal.Title>
                    <Modal.Title className='text-danger' id='warn'></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor='New Password'>New Password</label>
                    <input type='password' className='mx-5 border position-fixed' ref={newPasswordRef} onBlur={checkPassword} autoFocus />
                    <br />
                    <br />
                    <label htmlFor='Confirm Password'>Confirm Password</label>
                    <input type='password' className={enableButton ? ' position-fixed border border-success mx-2' : 'position-fixed mx-4 border border-danger'} onChange={comparePassword} disabled={!enable}></input>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary">Cancel</Button> */}
                    <Button type="button" className="btn btn-primary" disabled={!enableButton} onClick={savePassword}>Set Password</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (

        <div>
           <h1>hi</h1>
            {changePasswordBox()}</div>
    );
}

