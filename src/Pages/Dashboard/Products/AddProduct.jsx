import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { CAT, PRO2 } from '../../../Api/api'
import { Axios } from '../../../Api/Axios'
import Cookis from 'cookie-universal'
import { useNavigate } from 'react-router-dom'
import '../dashboard.css'
const AddProduct = () => {
    // All useState
    const [ form , setForm ] = useState({
        category : "",
        title : "",
        description : "",
        price : "",
        discount : "",
        About : ""
    })
    const dummyData = {
      category : null,
        title : "dummy",
        description : "dummy",
        price : 222,
        discount : 0,
        About : "dummy"
    }
    const [ categories , setCategories ] = useState([])
    const [ id , setId ] = useState(0)
    const [images , setImages] = useState([])
    const [laoding , setLaoding] = useState(false)
    const [ disable , setDisable ] = useState(true)

    // All useRef
    const upload = useRef()
    const progres = useRef([])
    const count = useRef(-1)
    const idImage = useRef([])

    // get token from cookies
    const cookis = Cookis()
    const token = cookis.get('ecommerce')
    
    const navigate =useNavigate()

    // get All Categories to display in select teg
    const getCategories = async () => {
        const categories =  await Axios.get(`/${CAT}`, {headers : {
          Authorization :  "Bearer " + token
      }})
        setCategories(categories.data.data)
    }
    useEffect(  ()=>{
      getCategories()

    } , [])

    // async function set product dummy
    const addDummyProduct = async () => {
      try{
        const product =   await Axios.post(`/${PRO2}/add`, dummyData , {headers : {
          Authorization :  "Bearer " + token
      }})
      setId(product.data.id)
      }
      catch(e){
        console.log(e)
      }
    }
   

  const addProduct = async (e) => {
    e.preventDefault()
    setDisable(true)
    
    setLaoding(true)
    try{
      await Axios.post(`${PRO2}/edit/${id}`,form, {headers : {
        Authorization :  "Bearer " + token
    }})
    setDisable(false)
    setLaoding(false)
    navigate("/dashboard/products")
    }catch(err){
      console.log(err)
    setLaoding(false)

    }

  }

  // function handelChange 
  const handelChange = (e) => {
    setDisable(false)
    setForm({...form , [e.target.name]:e.target.value})
    if(disable === true){
    addDummyProduct()

    }
  }

  // function handelImages 
  const handelImages = async (e) => {
    setImages(prev => [...prev,...e.target.files])
    const imagesAsFiles = e.target.files
    const data = new FormData()
    for (let i = 0; i < imagesAsFiles.length; i++) {
      count.current++
      data.append('image',imagesAsFiles[i])
      data.append('product_id',id)
      try{
         const res = await Axios.post(`/product-img/add`,data ,
          {onUploadProgress : (ProgressEvent) => {
            const loaded = ProgressEvent.loaded 
            const total = ProgressEvent.total
            // setUploading(Math.floor((loaded * 100)/total))
            progres.current[count.current].style.width =`${(loaded * 100)/total}%`
            progres.current[count.current].setAttribute('progres',`${Math.floor((loaded * 100)/total)}%`)


          }}
          , {headers : {
            Authorization :  "Bearer " + token
        }})

        idImage.current[count.current] = res.data.id
      }catch(err){

      }
    }
  }

  const handelDeleteImage = async (key , img) => {
    const findId = idImage.current[key]
    try{
      const res = await Axios.delete(`product-img/${findId}`, {headers : {
        Authorization :  "Bearer " + token
    }})
    setImages((prev) => prev.filter((images) => images !== img))
    idImage.current = idImage.current.filter(id => id !== findId)

    console.log(res)
    --count.current

    }catch(err){

    }
    
  }

console.log(categories)
  const mapOption = categories.map( (cat , key ) => {
    return <option key={key} value={cat.id}>{cat.title}</option>
  })

  // maping 
  const imagesUploadShow = images.map((img,key) => {
    return (
      <div className='m-2 p-2  w-100 border'>
        <div className=' d-flex justify-content-between' key={key}>
        <div className=' d-flex align-items-center '>
          <img width={"100px"} src={URL.createObjectURL(img)} />
          <div>
            <p>Name : {img.name}</p>
            <p>Size : {img.size / 1024 < 900 ? (img.size / 1024).toFixed(2) + " KB" :
            (img.size / 1024*1024).toFixed(2) + "MB" }</p>

          </div>
        </div>
        <Button style={{height:"35px"}} onClick={() => {handelDeleteImage(key , img)}} variant='danger'>Delete</Button>

        </div>
        <div className="custom-progres w-100">
          <div
          ref={(e => progres.current[key] = e)}
          className="child-progres"></div>
        </div>
      </div>
    )
  })

  return (
    <Form className='w-100 p-3 bg-white' onSubmit={addProduct}>
      <h1>Add Categories</h1>
       <div >

            <Form.Group className="mb-3 " >
                <Form.Select name='category'  onChange={ handelChange } value={form.category} id='category'  required  >
                    <option value=''>select category</option>
                    {mapOption}

                    </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3 " >
                <Form.Label>Title</Form.Label>
                <Form.Control name='title' disabled={disable} placeholder='Enter title product' onChange={ handelChange } value={form.title} id='title' type='text'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Label>Description</Form.Label>
                <Form.Control name='description' disabled={disable} placeholder='Enter description product' onChange={ handelChange} value={form.description} id='description'type='text'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Label>Price</Form.Label>
                <Form.Control name='price' disabled={disable} placeholder='Enter price product' onChange={ handelChange} value={form.price} id='price'type='number'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Label>Discount</Form.Label>
                <Form.Control name='discount' disabled={disable} placeholder='Enter discount product' onChange={ handelChange} value={form.discount} id='discount'type='number'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Label>About</Form.Label>
                <Form.Control name='About' disabled={disable} placeholder='Enter About product' onChange={ handelChange} value={form.About} id='name'type='text'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Control name='images'
                hidden
                ref={upload}
                multiple
                 placeholder='choose img product'
                 disabled={disable}
                 onChange={ handelImages } 
                 id='images'type='file'    />
            </Form.Group> 
            <div onClick={()=> upload.current.click()} style={{flexDirection:"column", color : disable ? "gray" : "#0d6efd" , borderColor : disable ? "gray" : "#0d6efd" }} className='upload-img  d-flex justify-content-center align-items-center w-100 '>
              <img  width={"100px"} style={{filter : disable ? "grayscale(1)" : "grayscale(0)"}}   src={require('../../../Assest/images/upload-img.png')} alt="upload images"/>    
              <p className='' >upload image</p>
            </div>  
            {
              imagesUploadShow

            }     
           
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
                disabled={ (form.title.length > 1 ) ? false : true}
                  type='submit'>Add Now</Button>
            )
           }
           
            
          
               
       </div>
    </Form>
  )
}

export default AddProduct