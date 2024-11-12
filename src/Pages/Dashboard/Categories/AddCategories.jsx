import React, { useEffect, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { CAT, CAT2, USER } from '../../../Api/api'
import { Axios } from '../../../Api/Axios'
import Cookis from 'cookie-universal'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Loading/Loading'

const AddCategories = () => {
    const [ title , setTitle] = useState('')
    const [ img , setImg] = useState('')
    const [laoding , setLaoding] = useState(false)

    const cookis = Cookis()
    const token = cookis.get('ecommerce')
    // const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
    
    const navigate =useNavigate()
    const [ disable , setDisable ] = useState(true)
   

  const addCategories = async (e) => {
    e.preventDefault()
    setDisable(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("image", img)
  
    setLaoding(true)
    try{
      await Axios.post(`${CAT2}/add`,formData, {headers : {
        Authorization :  "Bearer " + token
    }})
    setDisable(false)
    setLaoding(false)
    navigate("/dashboard/categories")
    }catch(err){
      console.log(err)
    setLaoding(false)

    }

  }


  return (
    <Form className='w-100 p-3 bg-white' onSubmit={addCategories}>
      <h1>Add Categories</h1>

    

       <div >

            <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
                <Form.Control name='name' placeholder='Enter your name' onChange={ (e) => setTitle(e.target.value)} value={title} id='name'type='text'  required  />
                
            </Form.Group>

             <Form.Group className="mb-3 " controlId="formBasicFile">
            <Form.Label>Image</Form.Label>

                <Form.Control name='name' placeholder='Enter your name' onChange={ (e) => setImg(e.target.files.item(0))}  id='name'type='file'  required  />
                
            </Form.Group>            
           
           {
            laoding ? ( <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>) : (
                <Button className='btn btn-primary'
                disabled={ (title.length > 1 ) ? false : true}
                  type='submit'>Add Now</Button>
            )
           }
           
            
          
               
       </div>
    </Form>
  )
}

export default AddCategories