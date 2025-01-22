import React from 'react'
import logo from '../../../Assest/images/logo.png'
// import './normalize.css'
import './style.css'
import '../../../Components/Website/MainPageComponents/style.css'
import Hero from '../../../Components/Website/MainPageComponents/Hero'
import Categorise from '../../../Components/Website/MainPageComponents/Categorise'
import ProductsTending from '../../../Components/Website/MainPageComponents/ProductsTending'
import LatestProducts from '../../../Components/Website/MainPageComponents/LatestProducts'
import TopRate from '../../../Components/Website/MainPageComponents/TopRate'


const MainPage = () => {
  return (
    <div class="">
        <Hero />
        <Categorise />
        <ProductsTending />
        <LatestProducts />
        <TopRate />
        
      </div>
  )
}

export default MainPage