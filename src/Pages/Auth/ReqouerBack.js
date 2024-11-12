import Cookis from 'cookie-universal'
import { Navigate, Outlet } from 'react-router-dom'
import Login from './Login'
const ReqouerBack = () => {
    const cookis = Cookis()
    const token = cookis.get('ecommerce')
    console.log(token)

    return token ? <Outlet /> : <Outlet /> //window.history.back() 
}

export default ReqouerBack