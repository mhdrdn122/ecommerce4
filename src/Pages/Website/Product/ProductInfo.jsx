import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { PRO, PRO2 } from '../../../Api/api';
import { Axios } from '../../../Api/Axios';
import Cookis from "cookie-universal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starIsEmpty } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { updateCart } from '../../../Context/CartContext';

const ProductInfo = () => {
  const [imgId, setImgId] = useState(1);
  const productId = useParams();
  const [productData, setProductData] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartUpdate = useContext(updateCart)
  
  const roundStars = Math.round(productData.rating);
  const starMin = Math.min(roundStars, 5);
  let starGold = Array.from({ length: starMin }).map((_, key) => (
    <FontAwesomeIcon key={key} fontSize={16} color="gold" icon={faStar} />
  ));
  let starEmpty = Array.from({ length: 5 - starMin }).map((_, key) => (
    <FontAwesomeIcon key={key} fontSize={16} icon={starIsEmpty} />
  ));

  const cookis = Cookis();
  const token = cookis.get('ecommerce');

  const getProducts = async () => {
    const product = await Axios.get(`${PRO2}/${productId.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).finally(() => setLoading(false));
    setProductData(product.data[0]);
    setImages(product.data[0].images);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleImageClick = (key) => {
    setImgId(key + 1); // ضبط imgId بناءً على الفهرس
  };

  useEffect(() => {
    const slideImage = () => {
      if (images.length > 0) {
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
      }
    };

    window.addEventListener('resize', slideImage);
    slideImage();

    return () => window.removeEventListener('resize', slideImage);
  }, [imgId, images]);

  const addToCart = () => {
    const getProduct = JSON.parse(localStorage.getItem("product")) || []
    getProduct.push(productData)
    localStorage.setItem("product" , JSON.stringify(getProduct))
    cartUpdate.setUpdate( prev => !prev)
    
  }
  return (
    <div className="card-wrapper container my-5">
      <div style={{ flexDirection: "row" }} className="card d-flex row">
        {/* Left Side */}
        <div className="product-imgs col-md-6">
          <div className="img-display">
            <div className="img-showcase">
              {images.map((img, key) => (
                <img key={key} src={img.image || ""} alt={`Product ${key + 1}`} />
              ))}
            </div>
          </div>
          <div className="img-select d-flex mt-3">
            {images.map((img, key) => (
              <div className="img-item me-2" key={key}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleImageClick(key); }}>
                  <img src={img.image} alt={`Thumbnail ${key + 1}`} />
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* Right Side */}
        <div className="product-content col-md-6">
          <h2 className="product-title">{productData.title}</h2>
          <a href="#" className="product-link text-decoration-none">{productData.About}</a>
          <div className="product-rating d-flex align-items-center mt-2">
          rating :
            {starGold}
            {starEmpty}
            <span className="ms-2"> {productData.rating}</span>
          </div>

          <div className="product-price mt-3">
            <p className="last-price">Old Price: <span>${productData.price}</span></p>
            <p className="new-price">New Price: <span>${productData.discount}</span></p>
            <p className="new-price">Description: <span>{productData.description}</span></p>

          </div>

          <div className="purchase-info mt-3">
            <input type="number" min="0" defaultValue="1" className="form-control d-inline-block me-2" style={{ width: '60px' }} />
            <button onClick={addToCart} type="button" className="btn btn-primary me-2">
              Add to Cart <i className="fas fa-shopping-cart"></i>
            </button>
            {/* <button type="button" className="btn btn-secondary">Compare</button> */}
          </div>

          {/* <div className="social-links mt-4">
            <p>Share At:</p>
            <a href="#" className="me-2"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="me-2"><i className="fab fa-twitter"></i></a>
            <a href="#" className="me-2"><i className="fab fa-instagram"></i></a>
            <a href="#" className="me-2"><i className="fab fa-whatsapp"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;


// export default ProductInfo;
