import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import { CART, PRO2 } from "../../../Api/api";
import { Axios } from "../../../Api/Axios";
import Cookis from "cookie-universal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as starIsEmpty } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { updateCart } from "../../../Context/CartContext";
import CounterInput from "../../../Components/Website/MainPageComponents/CounterInput";
import SkeltonShow from "../../../Components/Skelton/SkeltonShow";
import { Button } from "react-bootstrap";

const ProductInfo = () => {
  const [imgId, setImgId] = useState(0); // استخدم الفهرس بدلاً من الرقم
  const productId = useParams();
  const [productData, setProductData] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const cartUpdate = useContext(updateCart);

  const roundStars = Math.round(productData.rating || 0);
  const starMin = Math.min(roundStars, 5);
  let starGold = Array.from({ length: starMin }).map((_, key) => (
    <FontAwesomeIcon key={key} fontSize={16} color="gold" icon={faStar} />
  ));
  let starEmpty = Array.from({ length: 5 - starMin }).map((_, key) => (
    <FontAwesomeIcon key={key} fontSize={16} icon={starIsEmpty} />
  ));

  const cookis = Cookis();
  const token = cookis.get("ecommerce");

  const getProduct = async () => {
    const product = await Axios.get(`${PRO2}/${productId.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).finally(() => setLoading(false));
    setProductData(product.data[0]);
    setImages(product.data[0].images);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleImageClick = (key) => {
    setImgId(key); // استخدم الفهرس مباشرة
  };

  const checkStock = async () => {
    try {
      await Axios.post(`${CART}/check`, {
        product_id: productId.id,
        count: count,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const addToCart = async () => {
    const stockCheck = await checkStock();
    const getProduct = JSON.parse(localStorage.getItem("product")) || [];
    const productExist = getProduct.findIndex(
      (prod) => prod.id === productData.id
    );

    if (stockCheck) {
      if (productExist !== -1) {
        getProduct[productExist].count += count;
      } else {
        productData.count = count;
        getProduct.push(productData);
      }
      localStorage.setItem("product", JSON.stringify(getProduct));
      cartUpdate.setUpdate((prev) => !prev);
    }
  };

  if (loading) {
    return (
      <div className="container my-2">
        <div className="card d-flex flex-wrap p-1 align-items-start">
          <div className="product-imgs my-1">
            <SkeltonShow
              length={1}
              width={400}
              height={400}
              color="#e0e0e0"
              classes="justify-md-center"
            />
            <SkeltonShow
              length={3}
              width={50}
              height={50}
              color="#e0e0e0"
              classes="d-flex justify-content-center gap-3"
            />
          </div>
          <div className="product-content">
            <SkeltonShow
              length={1}
              width={500}
              height={50}
              color="#e0e0e0"
              classes="title-skeleton"
            />
            <SkeltonShow
              length={1}
              width={250}
              height={20}
              color="#e0e0e0"
              classes="about-skeleton"
            />
            <SkeltonShow
              length={1}
              width={350}
              height={30}
              color="#e0e0e0"
              classes="price-skeleton"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-wrapper container my-2">
      <div className="card d-flex align-items-start row" style={{flexDirection:"row"}}>
        {/* Left Side */}
        <div className="product-imgs col-md-6">
          <div className="img-display">
            <div className="img-showcase">
              {images.length > 0 && (
                <img
                  src={
                    "https://backend-ecomerce4-production.up.railway.app" +
                    images[imgId].image
                  }
                  alt={`Product ${imgId + 1}`}
                />
              )}
            </div>
          </div>
          <div className="img-select d-flex mt-3">
            {images.map((img, key) => (
              <div className="img-item me-2" key={key}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageClick(key);
                  }}
                >
                  <img
                    src={
                      "https://backend-ecomerce4-production.up.railway.app" +
                      img.image
                    }
                    alt={`Thumbnail ${key + 1}`}
                    style={{
                      border: imgId === key ? "2px solid #000" : "none",
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="product-content col-md-6">
          <h2 className="product-title">{productData.title}</h2>
          <div className="py-2">
            <p className="fs-4 m-0">About this item:</p>
            <span style={{ color: "gray" }} className="mx-2">
              {productData.About}
            </span>
          </div>

          <div className="product-rating d-flex align-items-center mt-2">
            Rating: {starGold}
            {starEmpty}
            <span className="ms-2">{productData.rating}</span>
          </div>

          <div className="product-price mt-3">
            <p className="last-price">
              Old Price: <span>${productData.price}</span>
            </p>
            <p className="new-price">
              New Price:{" "}
              <span>${productData.price - productData.discount}</span>
            </p>
            <p className="new-price">
              Description: <span>{productData.description}</span>
            </p>
          </div>

          <div className="purchase-info d-flex align-items-center mt-3">
            <CounterInput setCount={setCount} />
            <button
              onClick={addToCart}
              type="button"
              className="btn btn-dark me-2"
            >
              Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
        </div>

        <Link className="d-flex justify-content-end mb-2" to={"/"}>
          <Button>To Home Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductInfo;
