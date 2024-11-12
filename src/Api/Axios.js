import axios from 'axios'
import { BASEURL } from './api'
import Cookis from 'cookie-universal'

const cookie = Cookis()
const token = cookie.get('ecommerce')
export const Axios = axios.create(
    {baseURL : BASEURL ,
    headers : {
        Authorization :  "Bearer " + token
    }
    }
)
  