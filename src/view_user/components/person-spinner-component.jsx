import React, { useState } from 'react';

export default function PersonSpinner() {
  const [numberOfPersons, setNumberOfPersons] = useState(1);

  const handleIncrease = () => {
    setNumberOfPersons(numberOfPersons + 1);
  };

  const handleDecrease = () => {
    if (numberOfPersons > 1) {
      setNumberOfPersons(numberOfPersons - 1);
    }
  };

  const buttonStyle = {
    border: 'none', 
    background: 'none', 
    cursor: 'pointer',  
  };

  const numberStyle = {
    padding: '0 10px',
    color: '#D2691E', 
  };

  return (
    <div>
      <button style={buttonStyle} onClick={handleDecrease}>-</button>
      <span style={numberStyle}>{numberOfPersons}</span>
      <button style={buttonStyle} onClick={handleIncrease}>+</button>
    </div>
  );
}
