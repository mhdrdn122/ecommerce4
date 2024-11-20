import React, { useEffect, useState } from 'react'
import { Axios } from '../../../Api/Axios'
import { CAT } from '../../../Api/api'
import SkeltonShow from '../../../Components/Skelton/SkeltonShow'

const AllCategories = () => {
    const [categories , setCategories] = useState([])
    const [ loading , setLoading ] = useState(true)

    const getCategories = async () => {
      try{
        await Axios.get(`${CAT}`).then(data => setCategories(data.data)).finally(setLoading(true))

      }catch(err){
        console.log(err)
      }
    }

    useEffect( () => {
        getCategories()
    } , [])

    const categoriesShow = categories.map((cat , index) => {
      return (
        <div className='card-categories  border-radius-2 col-lg-2 d-flex col-md-6 col-12'>
            <img className='img-card-categories'   src={cat.image} alt="img" />
            <p className="p-2">{cat.title.length > 15 ? cat.title.slice(0,10) + "..." : cat.title}</p>
        </div>)
    })
  return (
    <div className='container-fluid py-3  all-categories'>
        <div className="row gap-3">

          
      {        
            loading ? (
              <div style={{width:"80%"}}>
            <SkeltonShow classes={"col-lg-2 w-100 col-md-6 col-sm-12 justify-content-center flex-wrap flex  gap-3 d-flex "} width={"180px"} color={"white"}  height={"60px"} length={50}/>

              </div>

            ) : (
              categoriesShow
            ) 

            }
           

        </div>
        
    </div>
  )
}

export default AllCategories