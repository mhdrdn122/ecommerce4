import { faStar as starisEmpty } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Product = ({ product }) => {
    const roundStars =  Math.round(product.rating)
    const starMin = Math.min(roundStars , 5)
    let starGold = Array.from({length:starMin}).map((_,key) => <FontAwesomeIcon fontSize={16} color="gold" icon={faStar} />)
    let starEmpty = Array.from({length:5 - starMin}).map((_,key) => <FontAwesomeIcon fontSize={16}  icon={starisEmpty} />)

    return (
      <NavLink to={`/product/${product.id}`} style={{overflow : "hidden" , textDecoration : "none"}} className="col-lg-3 col-md-6 col-12">
        <div className="product-item">
            {
                product.discount ? (
                      <span className="badge bg-success position-absolute m-3">-30%</span>

                ): ""
            }
          {/* <a href="#" className="btn-wishlist">
            <svg width="24" height="24">
              <use xlinkHref="#heart"></use>
            </svg>
          </a> */}
          <figure style={{overflow:"hidden"}}>
            <a href="#" title={product.title}>
              <img style={{maxWidth:"220px"}} src={ product.images.length > 0 ? "https://backend-ecomerce4-production.up.railway.app" + product.images[0].image : require("../images/thumb-bananas.png") } className="tab-image" alt={product.title} />
            </a>
          </figure>
          <h3>{product.title.length > 15 ? product.title.slice(0,15) + "..." : product.title}</h3>
          {/* <span className="qty">1 Unit</span> */}
          <span className="rating d-flex my-2 align-items-center ">
            {/* <svg width="24" height="24" className="text-primary">
              <use xlinkHref="#star-solid"></use>
            </svg>{" "} */}
                {starEmpty}
                {starGold}
            <span className="p-1" >{product.rating} </span>
          </span>

          <span className="price " style={{color: "gray" ,textDecoration : "line-through" , fontSize: "14px"}}>{product.price}$</span>
          
          <span className="price">{ product.price - product.discount }$</span>
          <span style={{fontSize : "16px" , color:"gray"}}>{product.description.length > 20 ? product.description.slice(0,20) + "..." : product.description }</span>

          <div className="d-flex align-items-center justify-content-between">
            {/* <div className="input-group product-qty">
              <span className="input-group-btn">
                <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                  <svg width="16" height="16">
                    <use xlinkHref="#minus"></use>
                  </svg>
                </button>
              </span>
              <input type="text" id="quantity" name="quantity" className="form-control input-number" value="1" readOnly />
              <span className="input-group-btn">
                <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                  <svg width="16" height="16">
                    <use xlinkHref="#plus"></use>
                  </svg>
                </button>
              </span>
            </div> */}
            <a href="#" className="nav-link">
              Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon>
            </a>
          </div>
        </div>
      </NavLink>
    );
  };
  export default Product