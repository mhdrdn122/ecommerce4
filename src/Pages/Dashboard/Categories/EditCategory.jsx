import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { CAT2, USER } from '../../../Api/api'
import { Axios } from '../../../Api/Axios'
import Cookis from 'cookie-universal'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading/Loading'

const EditCategory = () => {
    const [ title , setTitle] = useState('')
    const [ img , setImg] = useState('')

    const [ disable , setDisable ] = useState(true)
    const cookis = Cookis()
    const token = cookis.get('ecommerce')
    const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
    
    const navigate =useNavigate()
    const getCategory = async () => {
      setDisable(true)
     try{
      const user =  await Axios.get(`/${CAT2}/${id}`, {headers : {
        Authorization :  "Bearer " + token
    }})
    setDisable(false)

    setTitle(user.data.title)

    }catch(err){
      navigate('/dashboard/page404')
    }
    
      
  }
  useEffect(  ()=>{
    getCategory()

  } , [])

  const editUser = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("image", img)

    setDisable(true)
    try{
      await Axios.post(`${CAT2}/edit/${id}`,formData, {headers : {
        Authorization :  "Bearer " + token
    }})
    setDisable(false)

    navigate("/dashboard/categories")
    }catch(err){
      console.log(err)
    }

  }


  return (
    <>
    {
      disable ? (<Loading /> ) : (
        <Form className='w-100 p-3 bg-white' onSubmit={editUser}>
      <h1>Edit Categories</h1>

    

       <div >

            <Form.Group className="mb-3 " controlId="formBasicTitle">
                <Form.Control name='name' placeholder='Enter your Title' onChange={ (e) => setTitle(e.target.value)} value={title} id='name'type='text'  required  />
                
            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicFile">
            <Form.Label>Image</Form.Label>

                <Form.Control name='name' placeholder='Enter your name' onChange={ (e) => setImg(e.target.files.item(0))}  id='name'type='file'  required  />
                
            </Form.Group> 

           
            
           
            <button className='btn btn-primary' disabled={disable} type='submit'>Edit Now</button>
            
            
       </div>
    </Form>
      )
    }
    
    </>
  )
}

export default EditCategory