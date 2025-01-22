import React, { useContext, useEffect } from 'react'
import './bars.css'
import TopBar from '../../Components/Dashboard/TopBar'
import SideBar from '../../Components/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'
import { WindoeWidth } from '../../Context/WindoeContext'
const Dashboard = () => {
  const windoeSize = useContext(WindoeWidth)
  var widthS=""
  const getWidth = () => {
    if( windoeSize.windoeSize > 768 ){
      return widthS = "calc(100% - 240px)"
    }
    else if( windoeSize.windoeSize < 768 && windoeSize.windoeSize > 560 ){
      return widthS = "calc(100% - 60px)"
    }
    else{
      return widthS = "100%"
  
    }
  }
  useEffect(() => {
    getWidth()
    
  } , [])
  return (
    <div className='dashboard'>
        <TopBar />
        <div className='d-flex ' style={{paddingTop:"70px"}}>
        {/* widthS */}
        <SideBar />
        <div style={{
           width : "100%" }}>
        <Outlet />
        </div>
          
        </div>
    </div>
  )
}

export default Dashboard