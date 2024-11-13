import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import signUpService from '../Services/SignUpService';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import DashboardServices from '../Services/DashboardServices';
import { useContext } from 'react';
import UserContext from '../index'
// import UserContext from
export default function SignUp() {
    const [form, setForm] = useState({});
    const [editFunction, setEditFunction] = useState(false);
    let navigate = useNavigate();

    const { editUser,create,setCreate } = useContext(UserContext);

    useEffect(() => {
        if (editUser != null) {
            setEditFunction(true);
            setForm(editUser);
        }
    }, [editUser]);

    // useEffect(()=>{
    //     setCreate

    // },[create])

    let { register, handleSubmit, formState: { isValid, errors } } = useForm({
        mode: "onChange"
    });

    async function onSubmit(data) {
        if (editFunction) {
            const updatedUser =
            {
                firstName: data.firstName || form.firstName,
                lastName: data.lastName || form.lastName,
                email: data.email || form.email,
                roleId: data.roleId || form.roleId
            };

            try {
                const resp = await DashboardServices.updateUser(updatedUser);
                if (resp.status == 200) {
                    toast.success("Successfully Updated")
                    setEditFunction(false)
                    navigate("/admin/profile")
                }
            } catch (error) {
                if (error.response.status == 404) {
                    toast.error("Role Id Does Not Found")
                }
                else {
                    toast.error("Field can not be Empty")
                }
            }
        }
        else {
            try {
                const resp = await signUpService(data);
                console.log(resp.status);
                if (resp.status >= 200 && resp.status < 300) {
                    toast.success("Successfully Created", 3000);
                    if(!create)
                    {
                        navigate("/login");
                    }
                    else{
                        navigate("/admin/create")
                    }
                    
                }
            } catch (err) {
                if (err.response.status === 409) {
                    toast.warning("Email Already Exist", 3000);
                } else if (err.response.status === 404) {
                    toast.error("Role ID Does Not Exist", 3000);
                }
            }
        }
    }

    return(
        <div className={`mt-5 d-flex justify-content-center mt-5`} style={{ backgroundImage: "URL('')", marginLeft: editFunction ? "170px" : null }}>
            <div className='h-75 w-75 mt-5 border shadow-lg p-2'>
             { create? <h2 className='text-center'>Create</h2>:<h2 className='mt-4 text-center my-3'>{editFunction ? 'Update' : 'ZettaMine SignUp'}</h2>}
                <div className='card-body d-flex justify-content-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor='firstName'>First Name:</label></td>
                                    <td><input type='text' defaultValue={editFunction ? form.firstName : ''} className='form-control mb-1' placeholder={errors.firstName && errors.firstName.message} {...register("firstName", { required: editFunction ? false : "First Name is Required" })} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor='lastName'>Last Name:</label></td>
                                    <td><input type='text' defaultValue={editFunction ? form.lastName : ''} className='form-control mb-1' placeholder={errors.lastName && errors.lastName.message} {...register("lastName", { required: editFunction ? false : "Last Name is Required" })} /></td>
                                </tr>

                                {!editFunction &&
                                    <tr>
                                        <td><label htmlFor='email'>Email:</label></td>
                                        <td><input type='text' defaultValue={editFunction ? form.email : ''} className='form-control mb-1' placeholder={errors.email && errors.email.message} {...register("email", { required: "Email is Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })} /></td>
                                    </tr>}
                                <tr>
                                    <td><label htmlFor='roleId'>Role ID:</label></td>
                                    <td>
                                        <select defaultValue={editFunction ? form.roleId : ''} className='form-control mb-1' {...register("roleId", { required: editFunction ? false : "Role ID is Required" })}>
                                            <option value="">Select Role</option>
                                            <option value="1">ADMIN</option>
                                            <option value="2">HR</option>
                                            <option value="3">MANAGER</option>
                                            <option value="4">INTERNAL MANAGER</option>
                                        </select>
                                    </td>                                </tr>
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-center mb-4 mt-3'>
                        <input className='btn btn-primary align-content-center' type='submit' value={create?"Create": editFunction ? "Update" : "Sign Up"} disabled={editFunction ? false : !isValid} />   
                        {/* <input className='btn btn-primary align-content-center' type='submit' value={editFunction ? "Update" : "Sign Up"} disabled={editFunction ? false : !isValid} /> */}
                        </div>
                    </form>
                </div>

                {!create && !editFunction && <div className='d-flex justify-content-center my-2'>Already a member ?<NavLink className="text-decoration-none mx-2" to={"/login"}>login</NavLink></div>}
            </div>

        </div>
    );
}
