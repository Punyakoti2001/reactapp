import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from '../components/SignUp'
import LoginPage from '../components/LoginPage'
import ChangePassword from '../components/ChangePassword'
import Hr from '../dashboards/Hr'
import InternalEmployee from '../dashboards/InternalEmployee'
import ExternalEmployee from '../dashboards/ExternalEmployee'
import PageNotFound from '../dashboards/PageNotFound'
import Manager from '../dashboards/Manager'
import ForgetPassword from '../components/ForgetPassword'
import AdminDashBoard from '../dashboards/adminDashboard/AdminDashBoard'
import AdminRouters from './AdminRouters'
import { useContext } from 'react'
import UserContext from '../index'
import { useEffect } from 'react'
import Unauthorized from './Unauthorized'
import Dashboard from '../dashboards/adminDashboard/NavLinks/Dashboard'
import Profiles from '../dashboards/adminDashboard/NavLinks/Profiles'
import GoogleMap from '../dashboards/adminDashboard/NavLinks/GoogleMap'
import SampleCode from '../PagInation/SampleCode'
export default function AllRouting() {
    const { users, setUsers } = useContext(UserContext)

    useEffect(() => {

    }, [users])
    return (
        <div>

            <Routes>
                <Route path='/' element={<SignUp />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path="/change-password/:email" element={<ChangePassword />} />

                {/* <Route path='/admin' element={<AdminDashBoard/>}/> */}
                {/* <Route path='/HR' element={<Hr/>}/>
                <Route path='/manager' element={<Manager/>}/>
                <Route path='/internal-employee' element={<InternalEmployee/>}/>
                <Route path='/external-employee' element={<ExternalEmployee/>}/> */}

                <Route path='/**' element={<PageNotFound />} />
                <Route path='/forget-password' element={<ForgetPassword />} />
                <Route path='/forget-password/:email' element={<ChangePassword />} />

                <Route path='/admin' element={    
                        users && (users.roleId === 1) ? <AdminRouters /> : <Unauthorized />
                } >
                    <Route path="home" element={<Dashboard/>}/>
                    <Route path='profile' element={<Profiles/>}/>
                    <Route path='google-map' element={<GoogleMap/>}/>
                    <Route path='editUSer' element={<SignUp/>}/>
                    <Route path='create' element={<SignUp/>}/>
                </Route>

                <Route
                    path="/hr"
                    element={
                        users && users.roleId === 2 ? <Hr /> : <Unauthorized />
                    }
                />
                <Route path='/sample' element={<SampleCode/>}/>
            </Routes>

        </div>
    )
}
