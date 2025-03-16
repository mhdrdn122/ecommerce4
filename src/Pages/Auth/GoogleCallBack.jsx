import React, { useEffect } from 'react'
import { Axios } from '../../Api/Axios'
import { BASEURL, GOOGLE_AUTH } from '../../Api/api'
import { useLocation } from 'react-router-dom'

const GoogleCallBack = () => {
    const location = useLocation()

    const googleCall = async () => {
        try{
          const res = await  Axios.get(`${BASEURL}/${GOOGLE_AUTH}${location.search}`)
                console.log(res)
        }catch(e){
            console.log(e)
        }
        
    }

    useEffect(
        googleCall()
    ,[])

  return (
    <div>GoogleCallBack</div>
  )
}

export default GoogleCallBack