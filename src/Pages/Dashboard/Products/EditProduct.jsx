import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { CAT, PRO2 } from '../../../Api/api'
import { Axios } from '../../../Api/Axios'
import Cookis from 'cookie-universal'
import { useNavigate, useParams } from 'react-router-dom'
import '../dashboard.css'
const EditProduct = () => {
    // All useState
    const [ form , setForm ] = useState({
        category : "",
        title : "",
        description : "",
        price : "",
        discount : "",
        About : "",
        stock : 0,
    })
    
    const [ categories , setCategories ] = useState([])

    const {id} = useParams()
    const [images , setImages] = useState([])
    const [imagesFromServer , setImagesFromServer] = useState([])
    const [idesImagesFromServer , setIdesImagesFromServer] = useState([])

    const [laoding , setLaoding] = useState(false)


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
        setCategories(categories.data)
    }

    // get product information to display in form
    const getProduct = async () => {
        const product =  await Axios.get(`/${PRO2}/${id}`, {headers : {
          Authorization :  "Bearer " + token
      }})
// console.log(product)

        setForm(product.data[0])
        setImagesFromServer(product.data[0].images)

    }
    useEffect(  ()=>{
      getCategories()
      getProduct()

    } , [])
   
  const addProduct = async (e) => {
    e.preventDefault()
   
    setLaoding(true)
    try{
      for (let index = 0; index < idesImagesFromServer.length; index++) {
        await Axios.delete(`product-img/${idesImagesFromServer[index]}`, {headers : {
          Authorization :  "Bearer " + token
      }})
        
      }

      await Axios.post(`${PRO2}/edit/${id}`,form, {headers : {
        Authorization :  "Bearer " + token
    }})
    setLaoding(false)
    navigate("/dashboard/products")
    }catch(err){
      console.log(err)
    setLaoding(false)

    }

  }

  // function handelChange 
  const handelChange = (e) => {
    // setDisable(false)
    setForm({...form , [e.target.name]:e.target.value})
    
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
  // console.log(idImage)


  // delete img before uplode to backend
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

  // delete img after getting img from backend
  const handelDeleteFromServer =  (id) => {
    console.log(id)
    setIdesImagesFromServer((prev) =>{ return [...prev , id]})
    setImagesFromServer((prev) => prev.filter(img => img.id !== id))
   
  }


  const mapOption = categories.map( (cat , key ) => {
    return <option key={key} value={cat.id}>{cat.title}</option>
  })

  // console.log(idImage.current)
  // maping 
  const imagesUploadShow = images.map((img,key) => {
    return (
      <div className='m-2 p-2  w-100 border'>
        <div className=' d-flex justify-content-between' key={key}>
        <div className=' d-flex align-items-center '>
          <img width={"100px"} src={URL.createObjectURL(img)} alt='img-product' />
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

  const imagesFromServerShow = imagesFromServer.map((img,key) => {
    return (
      <div className='m-2 p-2  w-100 border'>
        <div className=' d-flex position-relative align-items-center justify-content-between' key={key}>
        <img width={"100%"} src={img.image} alt='img-product' />
        <Button style={{height:"35px" ,top:"0",left:"0"}} className='position-absolute' onClick={() => {handelDeleteFromServer(img.id)}} variant='danger'>Delete</Button>
        </div>
      </div>
    )
  })
// console.log(images)

  return (
    <Form className='w-100 p-3 bg-white' onSubmit={addProduct}>
      <h1>Edit Product</h1>
       <div >

            <Form.Group className="mb-3 " >
                <Form.Select name='category'  onChange={ handelChange } value={form.category} id='category'  required  >
                    <option value=''>select category</option>
                    {mapOption}

                    </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3 " >
                <Form.Label>Title</Form.Label>
                <Form.Control name='title'  placeholder='Enter title product' onChange={ handelChange } value={form.title} id='title' type='text'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Label>Description</Form.Label>
                <Form.Control name='description'  placeholder='Enter description product' onChange={ handelChange} value={form.description} id='description'type='text'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Label>Price</Form.Label>
                <Form.Control name='price'  placeholder='Enter price product' onChange={ handelChange} value={form.price} id='price'type='number'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Label>Discount</Form.Label>
                <Form.Control name='discount'  placeholder='Enter discount product' onChange={ handelChange} value={form.discount} id='discount'type='number'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Label>About</Form.Label>
                <Form.Control name='About'  placeholder='Enter About product' onChange={ handelChange} value={form.About} id='name'type='text'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Label>Stock</Form.Label>
                <Form.Control name='stock'  placeholder='Enter Stock product' onChange={ handelChange} value={form.stock} id='stock'type='nimber'  required  />
            </Form.Group>

            <Form.Group className="mb-3 " >
                <Form.Control name='images'
                hidden
                ref={upload}
                multiple
                 placeholder='choose img product'
                 
                 onChange={ handelImages } 
                 id='images'type='file'    />
            </Form.Group> 
            <div onClick={()=> upload.current.click()} style={{flexDirection:"column", color :  "#0d6efd" , borderColor : "#0d6efd" }} className='upload-img  d-flex justify-content-center align-items-center w-100 '>
              <img  width={"100px"} style={{filter :  "grayscale(0)"}}   src={require('../../../Assest/images/upload-img.png')} alt="upload images"/>    
              <p className='' >upload image</p>
            </div>  
             <div className='d-flex '>
             {
              imagesFromServerShow
              } 
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
                  type='submit'>Edit Now</Button>
            )
           }
           
            
          
               
       </div>
    </Form>
  )
}

export default EditProduct