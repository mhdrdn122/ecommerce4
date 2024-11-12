import React, { useEffect, useState } from 'react'
import {  CAT2, PRO, PRO2} from '../../../Api/api'
import Cookis from 'cookie-universal'
import { Axios } from '../../../Api/Axios'
import { Link } from 'react-router-dom'
import TableShow from '../../../Components/Dashboard/TableShow'
import { PaginatedItems } from '../../../Components/Pagination/Pagination'

const Products = () => {
  const [ products , setProducts ] = useState([])
  const [ page , setPage ] = useState(1)
  const [ limit , setLimit ] = useState(3)
  const [ totalPages , setTotalPages ] = useState()


  const [ reRenderComponent , setReRenderComponent ] = useState(true)
    const cookis = Cookis()
    const token = cookis.get('ecommerce')


    const getProducts = async () => {
        const products =  await Axios.get(`/${PRO}?limit=${limit}&page=${page}`, {headers : {
          Authorization :  "Bearer " + token
      }})
        setProducts(products.data.data)
        setTotalPages(products.data.total)
    }
    useEffect(  ()=>{
        getProducts()

    } , [limit , page])


console.log(totalPages)
   

    const deleteProduct = async (id) => {
      try{
        const res = await Axios.delete(`${PRO2}/${id}`, {headers : {
          Authorization :  "Bearer " + token
      }})
        setReRenderComponent( prev => !prev)
      }catch(err){
        console.log(err)

      }
    }
   console.log(products)
    const header = [
      
      {
        key : 'images',
        name : "images"
      },
      {
        key : 'category',
        name : "Category"
      },
      {
        key : 'title',
        name : "Title"
      },
      {
        key : 'description',
        name : "Description"
      },
      {
        key : 'price',
        name : "Price"
      },
      {
        key : 'about',
        name : "About"
      },
      {
        key : 'discount',
        name : "Discount"
      },
      
    ]
  return (
    
    <div className='w-100 bg-white p-2'>
      <div className='d-flex justify-content-between m-1 align-items-center'>
      <h3>Products Page</h3>
      <Link to="/dashboard/add-product">
        <button className='btn btn-primary'>Add Product</button>
      </Link>
    </div>
    
    <TableShow header={header} total={totalPages} setLimit={setLimit} setPage={setPage} data={products}  page={page} limit={limit}   del={deleteProduct} />
    </div>
  )
}

export default Products