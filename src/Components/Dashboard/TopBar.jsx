import React, { useContext, useEffect, useState } from 'react'
import './style-bar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Menu } from '../../Context/MenuContext'
import Cookis from 'cookie-universal'
import { BASEURL, LOGOUT, USER } from '../../Api/api'
import axios from 'axios'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const TopBar = () => {
  const menu = useContext(Menu)
  const [ name , setName ] = useState('')
  const  navigate = useNavigate()

  const cookis = Cookis()
    const token = cookis.get('ecommerce')

    const getUser = async () => {
        const res = await axios.get(`${BASEURL}/${USER}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => { setName(res.data.name) })
        return res
    }

    useEffect( ()=>{
      getUser()
    },[])
    
    const logout = async () =>{
      try{
        await axios.get(`${BASEURL}/${LOGOUT}`, {
          headers: {
              Authorization: "Bearer " + token
          }
      }).then( () => navigate("/login") )
      }catch(err){
        console.log(err)
      }
    }

  return (
    <h3 className='top-bar d-flex align-items-center justify-content-between '>
      <div className='d-flex justify-content-between align-items-center  '>
        
      E-commerce
      <FontAwesomeIcon cursor={"pointer"} icon={faBars} onClick={() => menu.setIsOpen((prev) => !prev)} />
      </div>

 
    <DropdownButton id="dropdown-basic-button" title={name}>
      <Dropdown.Item href="#/action-1" onClick={logout}>logout</Dropdown.Item>
    </DropdownButton>

    </h3>
  )
}

export default TopBar