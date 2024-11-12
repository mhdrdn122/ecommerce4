import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Cookis from 'cookie-universal'
import axios from 'axios'
import { BASEURL, USER } from '../../Api/api'
import Loading from '../../Components/Loading/Loading'
import Page403 from '../Dashboard/403'

const ReqouerAuth = ({allowedRole}) => {
    const [user, setUser] = useState("")
    const navigate = useNavigate()
    const cookis = Cookis()
    const token = cookis.get('ecommerce')

    const getUser = async () => {
        const res = await axios.get(`${BASEURL}/${USER}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => { setUser(res.data) }).catch(() => {
            navigate('/login')
        })
        return res
    }
    useEffect(() => {
        getUser()
    }, [])
    return token ? user === "" ? <Loading /> : allowedRole.includes(user.role) ?  <Outlet /> : <Page403 /> : <Navigate to={`/login`} replace={true} />
}

export default ReqouerAuth