import React from 'react'
import Navbar from '../../../Components/Website/MainPageComponents/Navbar'
import SubNav from '../../../Components/Website/MainPageComponents/SubNav'
import { Outlet } from 'react-router-dom'

const WebCategories = () => {
  return (
    <div>
        <Navbar />
        <SubNav />
        <Outlet />
    </div>
  )
}

export default WebCategories