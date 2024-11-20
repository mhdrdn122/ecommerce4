import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateCart } from '../../../Context/CartContext';

function Cart() {
  const [show, setShow] = useState(false);
  const [ productFromLocal , setProductFromLocal ] = useState([])
  const cartUpdate = useContext(updateCart)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect( () => {
    const getProduct = JSON.parse(localStorage.getItem("product")) || []
    
    setProductFromLocal(getProduct)
  } , [cartUpdate.update])

  const myProducts = productFromLocal.map(prod => {
    return (
        <div className='row border m-1 p-0'>
          <div className='col-12 d-flex gap-3  align-items-center'>
            <div className='col-4'>
              <img className='w-100 rounded' src={prod.images.length > 0 ? prod.images[0].image : ""} alt={prod.title} />
            </div>
            <div className='col-6 '>
              <h4 className='m-0 text-black fs-7'>{prod.title}</h4>
              <p className='m-0'>{prod.About.length > 20 ? prod.About.slice(0,20) + "..." : prod.About}</p>
              <div className='m-0 d-flex d-flex gap-3 align-items-center '> 
                <p className='m-0 text-decoration-line-through  fw-bold'>{prod.price}</p>
                <p className='m-0'>{prod.discount}</p>
              </div>

            </div>

          </div>

        </div>
    )
  })
return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cart
      </Button>

      <Modal show={show} onHide={handleClose}>
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