import React, { useEffect , useState } from 'react'
import {CAT, CAT2} from '../../../Api/api'
import {Axios} from '../../../Api/Axios'
import { Link } from 'react-router-dom'
import SkeltonShow from '../../Skelton/SkeltonShow'

const SubNav = () => {
    const [categories , setCategories] = useState([])
    const [ loading , setLoading ] = useState(true)

    const getCategories = async () => {
      try{
        await Axios.get(`${CAT}`).then(data => setCategories(data.data.slice(-5))).finally(setLoading(false))

      }catch(err){
        console.log(err)
      }
    }

    useEffect( () => {
        getCategories()
    } , [])

    const categoriesShow = categories.map((cat , index) => {
      return (
        
        
            <p className='black' key={index}>
            {cat.title.length > 15 ? cat.title.slice(0,10) + "..." : cat.title}
            </p>
      )}
    )

  return (
    <div className='container-fluid border-bottom'>
      <div className=' d-flex justify-content-start gap-3 align-items-center  p-2 '>
      {

      
        loading ? (
          <div style={{width:"80%"}}>
      <SkeltonShow classes={"col-lg-2 w-100 col-md-6 col-sm-12 flex-wrap flex  gap-3 d-flex "} width={"60px"}  height={"30px"} length={7}/>

          </div>

        ) : (
          categoriesShow
        ) 
      
      }
      <p className='grow'>
      <Link to={'/all-categories'}>
        show All
      </Link>
      </p>
    </div>
    </div>
  )
}

export default SubNav