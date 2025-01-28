import React from 'react'
import { WindoeWidth } from '../../Context/WindoeContext';
import { useContext } from 'react';

const ButtonAuthWithGoogle = () => {
  const windoeSize = useContext(WindoeWidth);

  return (
    <button type="button" class="login-with-google-btn " >
        
        {
          windoeSize.widthSize > 500 ? "Sign in with Google" : null
        }
    </button>
  )
}

export default ButtonAuthWithGoogle