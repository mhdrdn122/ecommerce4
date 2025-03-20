import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateCart } from '../../../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CounterInput from './CounterInput';

function Cart() {
  const [show, setShow] = useState(false);
  const [ productFromLocal , setProductFromLocal ] = useState([])
  const cartUpdate = useContext(updateCart)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ count , setCount ] = useState(1)

  useEffect( () => {
    const getProduct = JSON.parse(localStorage.getItem("product")) || []
    
    setProductFromLocal(getProduct)
  } , [cartUpdate.update])

  const deleteFromCart = (id) => {
    // console.log(id)
    // console.log(productFromLocal)

    const products = productFromLocal.filter(prod => prod.id !== id)
    localStorage.setItem('product' , JSON.stringify(products))
    // console.log(products)
    setProductFromLocal(products)
  }
  const changeCount = (id , count) => {
    // console.log(count)
    const getProducts = JSON.parse(localStorage.getItem("product")) || []
    const product = getProducts.filter( prod => prod.id == id)
    if(product.count){
      product[0].count += count
    }else{
      product[0].count = count
    }
    console.log(product)

    localStorage.setItem('product',JSON.stringify(getProducts))
    

  }

  console.log(productFromLocal)
  const myProducts = productFromLocal.map(prod => {
    return (
        <div className='row border m-1 p-0'>
          <div className='col-12 d-flex gap-3  align-items-center'>
            <div className='col-4'>
              <img className='w-100 rounded' src={prod.images.length > 0 ? "https://backend-ecomerce4-production.up.railway.app" + prod.images[0].image : ""} alt={prod.title} />
            </div>
            <div className='col-6 '>
              <h4 className='m-0 text-black fs-9'>{prod.title.length > 15 ? prod.title.slice(0,15) + "..." : prod.title}</h4>
              <p className='m-0'>{prod.About.length > 20 ? prod.About.slice(0,20) + "..." : prod.About}</p>
              <div className='m-0 d-flex d-flex gap-3 align-items-center '> 
                <p className='m-0 text-decoration-line-through  fw-bold'>{prod.price}</p>
                <p className='m-0'>{prod.discount}</p>
              </div>
              <div className='' style={{margin: "10px 0"}}>
              <CounterInput count={prod.count} id={prod.id} changeCount={changeCount}  setCount={setCount} />

              </div>

            </div>
            <div className="col-2">
            <button class="btn btn-danger btn-sm rounded" onClick={() => deleteFromCart(prod.id)} type="button" data-toggle="tooltip" data-placement="top" title="Delete">
              <FontAwesomeIcon icon={faTrash} />
              </button>

            </div>

          </div>

        </div>
    )
  })
return (
    <>
      <Button className='btn' variant="" onClick={handleShow}>
        Cart
      </Button>

      <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
               myProducts
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;