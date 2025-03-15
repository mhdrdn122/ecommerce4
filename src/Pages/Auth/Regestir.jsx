import axios from 'axios'
import React, { useState } from 'react'
import { BASEURL, REGISTER } from '../../Api/api'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading'
import Cookis from 'cookie-universal'
import ButtonAuthWithGoogle from '../../Components/Auth/ButtonAuthWithGoogle'
import { Form } from 'react-bootstrap'
import '../../Css/Components/form.css'
const Regestir = () => {
    const [form , setForm ] = useState({
        name:'',
        email:'',
        password: ''
    })
    const [error , setError] = useState('')
    const [loading , setLoading] = useState(false)

    const cookis = Cookis()

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        // console.log(form)
        try{
           const res = await axios.post(`${BASEURL}/${REGISTER}`,form)
           const token = res.data.token
           cookis.set("ecommerce", token)

           navigate('/dashboard')
        }
        catch(err){
            console.log(err)
            if(err.response.status === 422){
                setError("Email is already been taken")
            }else{
                setError("Internal Servere ERR")
            }
            setLoading(false)
        }
    }

  return (
    <>
    {
    loading &&
     (<div className='body'>
        <Loading />
    </div>) 
    }
    {
         ( <div className='container'>

            <div className="row h-100">
                
                <Form className='form' onSubmit={handleSubmit}>
                <h1>Regestir Now</h1>
    
                   <div className="custom-form">

                        <Form.Group className="mb-3 form-custom" controlId="formBasicEmail">
                            <Form.Control name='name' placeholder='Enter your name' value={form.name} id='name'type='text' onChange={handleChange} required  />
                            
                        </Form.Group>

                        <Form.Group className="mb-3 form-custom" controlId="formBasicEmail">
                            <Form.Control name='email' placeholder='Enter your email' value={form.email} id='email'type='email' onChange={handleChange} required  />
                            
                        </Form.Group>

                        <Form.Group className="mb-3 form-custom" controlId="formBasicEmail">
                            <Form.Control name='password' id='password'type='password' placeholder='Enter your Password' onChange={handleChange} required minLength='6' />
                            
                        </Form.Group>
                        
                       
                        
                        <div className='d-flex align-items-center gap-3'>
                            <button className='btn btn-primary ' style={{
                                padding : " 12px 16px 12px 16px "
                            }} type='submit'>Register Now</button>
                            
                            <a href={`https://backend-ecomerce4-production.up.railway.app/login-google`}> <ButtonAuthWithGoogle /> </a>
                            
                        </div>
                        
                        { error && (
                        <span className='error'>{error}</span>
                        )}

                        <p className='footer-form'>
                        are you have Account ?<Link className='m-2' to={`/login`}>
                        Sign in                    
                        </Link>
                        </p>
                        
                   </div>
                </Form>
            </div>
            
        </div> )
    }

    </>
  )
}

export default Regestir