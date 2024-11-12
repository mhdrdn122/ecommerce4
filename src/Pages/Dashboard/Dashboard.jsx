import React from 'react'
import './bars.css'
import TopBar from '../../Components/Dashboard/TopBar'
import SideBar from '../../Components/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className='dashboard'>
        <TopBar />
        <div className='d-flex ' style={{paddingTop:"70px"}}>

        <SideBar />
        <Outlet />
          
        </div>
    </div>
  )
}

export default Dashboard