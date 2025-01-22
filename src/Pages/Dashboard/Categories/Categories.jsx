import React, { useEffect, useState } from 'react'
import { CAT, CAT2 } from '../../../Api/api'
import Cookis from 'cookie-universal'
import { Axios } from '../../../Api/Axios'
import { Link } from 'react-router-dom'
import TableShow from '../../../Components/Dashboard/TableShow'

const Categories = () => {
  const [ categories , setCategories ] = useState([])
  const [ reRenderComponent , setReRenderComponent ] = useState(true)
  // const [ noUser , setNoUser ] = useState(false)
  const [ totalPages , setTotalPages ] = useState()
  const [reRender, setReRender] = useState(true);
  

    const cookis = Cookis()
    const token = cookis.get('ecommerce')

    const [ page , setPage ] = useState(1)
    const [ limit , setLimit ] = useState(5)
   



    const getCategories = async () => {
        const categories =  await Axios.get(`/${CAT}?limit=${limit}&page=${page}`, {headers : {
          Authorization :  "Bearer " + token
      }})
      // console.log(categories)
        setCategories(categories.data.data)
        setTotalPages(categories.data.total)
    }
    useEffect(  ()=>{
      getCategories()

    } , [limit,page])



   

    const deleteCategory = async (id) => {
      try{
        const res = await Axios.delete(`${CAT2}/${id}`, {headers : {
          Authorization :  "Bearer " + token
      }})
        // setCategories( prov => prov.filter(item => item.id != id))
        // setReRenderComponent( prev => !prev)
    setReRender(prov => !prov)

        
      }catch(err){
        console.log(err)

      }
    }
   
    const header = [
      {
        key : 'title',
        name : "Title"
      },
      {
        key : 'image',
        name : "Image"
      },
      
    ]
  return (
    
    <div className='w-100 bg-white p-2'>
      <div className='d-flex justify-content-between m-1 align-items-center'>
      <h3>Category Page</h3>
      <Link to="/dashboard/add-category">
        <button className='btn btn-primary'>Add Category</button>
      </Link>
    </div>
    
    <TableShow keySearch={CAT2} header={header} total={totalPages} setLimit={setLimit} setPage={setPage} page={page} limit={limit} data={categories}   del={deleteCategory} />
  

    </div>
  )
}

export default Categories