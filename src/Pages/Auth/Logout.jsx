import axios from 'axios'
import React from 'react'
import { BASEURL, LOGOUT } from '../../Api/api'
import Cookis from 'cookie-universal'

const Logout = () => {
    const cookis = Cookis()


    const handleLogoutSubmit = async () => {
        try{
            const res = await axios.get(`${BASEURL}/${LOGOUT}`, {headers:{
                Authorization: 'Bearer ' + cookis.get("ecommerce")
            }})
            console.log(res)
        }
        catch(err){
            console.log(err)

        }
        console.log("test")
    }

  return (
    <button onClick={handleLogoutSubmit}>Logout</button>
  )
}

export default Logout