import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../../..'

export default function Dashboard() 
{
  let {create,setCreate} = useContext(UserContext)

  return (
    <main className='' style={{marginTop:"60px", marginLeft:"170px"}}>
     <NavLink className="w-50 text-decoration-none" onClick={() => { setCreate(true) }} to={"/admin/create"}>
      <div className='card w-25 bg-secondary position-fixed' style={{ top: "200px", left: "100px",marginLeft:"200px" }}>
        <div className='card-body text-center text-white'>
          Create Account
        </div>
      </div>
    </NavLink>

        

        
    </main>
  )
}
