import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import AdminDashBoard from '../dashboards/adminDashboard/AdminDashBoard'
export default function AdminRouters() {
  return (
    <div>
            <AdminDashBoard/>
    </div>
  )
}
