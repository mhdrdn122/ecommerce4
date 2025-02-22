import React from 'react'
import { WindoeWidth } from '../../Context/WindoeContext';
import { useContext } from 'react';

const ButtonAuthWithGoogle = () => {
  const windoeSize = useContext(WindoeWidth);

  return (
    <>
    {
       windoeSize.widthSize > 500 ? ( 
       
       <button type="button" style={{width: "20px" , height:"50px" , backgroundPosition: ""}} class="login-with-google-btn " ></button>) : (
        
    <button type="button" class="login-with-google-btn " >
         Sign in with Google
    </button>)
    }
    </>
  )
}

export default ButtonAuthWithGoogle