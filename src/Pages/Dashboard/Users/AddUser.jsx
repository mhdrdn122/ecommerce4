import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { USER } from '../../../Api/api'
import { Axios } from '../../../Api/Axios'
import Cookis from 'cookie-universal'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading/Loading'

const AddUser = () => {
    const [ name , setName] = useState('')
    const [ email , setEmail] = useState('')
    const [ role , setRole] = useState('')
    const [ password , setPassword] = useState('')


    const [ disable , setDisable ] = useState(true)
    const cookis = Cookis()
    const token = cookis.get('ecommerce')
    const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
    
    const navigate =useNavigate()
   

  const addUser = async (e) => {
    e.preventDefault()
    setDisable(true)
    try{
      await Axios.post(`${USER}/add`,{name:name, email:email,role:role , password:password}, {headers : {
        Authorization :  "Bearer " + token
    }})
    setDisable(false)

    navigate("/dashboard/users")
    }catch(err){
      console.log(err)
    }

  }


  return (
    <Form className='w-100 p-3 bg-white' onSubmit={addUser}>
      <h1>Edit User</h1>

    

       <div >

            <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Control name='name' placeholder='Enter your name' onChange={ (e) => setName(e.target.value)} value={name} id='name'type='text'  required  />
                
            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Control name='email' placeholder='Enter your email' value={email} onChange={ (e) => setEmail(e.target.value)} id='email'type='email'  required  />
                
            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Control name='password' placeholder='Enter your password' value={password} onChange={ (e) => setPassword(e.target.value)} id='password'type='password'  required  />
                
            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicSelect">
                <Form.Select name='role'  value={role}
                 onChange={ (e) => setRole(e.target.value)}   required  >
                  <option disable value=''>select role</option>
                  <option  value='1995'>admin</option>
                  <option disable value='1992'>writer</option>
                  <option disable value='1999'>Product</option>
                  <option disable value='2001'>User</option>

                 </Form.Select>
                
            </Form.Group>
            
           
            <button className='btn btn-primary' disabled={ (name.length > 1 && email.length > 1 && password.length >= 6 && role != '') ? false : true} type='submit'>Add Now</button>
            
            
       </div>
    </Form>
  )
}

export default AddUser