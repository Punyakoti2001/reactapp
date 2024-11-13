import React from 'react'
import SideNavBar from './SideNavBar'
import TopNavBar from './TopNavBar'
import {Outlet} from "react-router-dom"


export default function AdminDashBoard() {
  return (
    <div>
       <Outlet/>
      <TopNavBar/>
      <SideNavBar/>
    </div>
  )
}
