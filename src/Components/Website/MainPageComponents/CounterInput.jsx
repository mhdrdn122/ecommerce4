import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const CounterInput = (props) => {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if(props.setCount){
      props.setCount(value)
    }

    if(props.changeCount){
      props.changeCount(props.id , value)
 

    }
  } , [value])

  useEffect(() => {
    if(props.count){
      setValue(props.count)
    }


  } , [props.count])

  const increment = () => {
    setValue((prevValue) => prevValue + 1);
  };


  const decrement = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(isNaN(newValue) || newValue < 0 ? 0 : newValue);
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <Button
        className="btn btn-secondary "
        onClick={decrement}
        aria-label="Decrement"
        variant="dark"

      >
        <FontAwesomeIcon  icon={faMinus} />
      </Button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="form-control  text-center mx-2"
        style={{ maxWidth: "90px" }}
        min="0"
      />
      

      <Button
        className="btn btn-primary btn-outline-primary"
        onClick={increment}
        variant="light"
        aria-label="Increment"
      >
        
        <FontAwesomeIcon  icon={faPlus} />
      </Button>
    </div>
  );
};

export default CounterInput;
