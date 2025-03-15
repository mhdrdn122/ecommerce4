import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASEURL, USER, USERS } from '../../../Api/api'
import Cookis from 'cookie-universal'
import Logout from '../../Auth/Logout'
import { Table } from 'react-bootstrap'
import { Axios } from '../../../Api/Axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import TableShow from '../../../Components/Dashboard/TableShow'

const Users = () => {
  const [ users , setUsers ] = useState([])
  const [ currentUser , setCurrentUser] = useState({})
  const [ reRenderComponent , setReRenderComponent ] = useState(true)
  const [ noUser , setNoUser ] = useState(false)
  const [ page , setPage ] = useState(1)
  const [ limit , setLimit ] = useState(3)
  const [ totalPages , setTotalPages ] = useState(3)

 
    const cookis = Cookis()
    const token = cookis.get('ecommerce')


    const getCurrentUser = async () => {
      const user =  await Axios.get(`/${USER}?limit=${limit}&page=${page}`, {headers : {
        Authorization :  "Bearer " + token
    }}).then( (data) => {setCurrentUser(data.data)
    }).then( () => setNoUser(true))
      
      
  }
  useEffect(  ()=>{
    getCurrentUser()

  } , [page , limit])

  



    const getUsers = async () => {
        const users =  await Axios.get(`/${USERS}`, {headers : {
          Authorization :  "Bearer " + token
      }})
        setUsers(users.data.data)
      setTotalPages(users.data.total)

    }
    useEffect(  ()=>{
       getUsers()

    } , [page , limit])


 
   

    const deleteUser = async (id) => {
      
      if(id != currentUser.id ){
        try{
          const res = await Axios.delete(`${USER}/${id}`, {headers : {
            Authorization :  "Bearer " + token
        }})
        // console.log(res)
          setUsers( prov => prov.filter(item => item.id != id))
          setReRenderComponent( prev => !prev)
        }catch(err){
          console.log(err)
  
        }
      }
    }
   
    const header = [
      {
        key : 'name',
        name : "username"
      },
      {
        key : 'email',
        name : "email"
      },
      {
        key : 'role',
        name : "role"
      },
    ]
  return (
    
    <div className='w-100 h-100 bg-white p-2'>
      <div className='d-flex justify-content-between m-1 align-items-center'>
      <h3>Users Page</h3>
      <Link to="/dashboard/add-user">
        <button className='btn btn-primary'>Add User</button>
      </Link>
    </div>
    
    <TableShow keySearch={USER}  header={header} data={users} total={totalPages} setLimit={setLimit} setPage={setPage} page={page} limit={limit}  currentUser={currentUser} del={deleteUser} />
   

    </div>
  )
}

export default Users