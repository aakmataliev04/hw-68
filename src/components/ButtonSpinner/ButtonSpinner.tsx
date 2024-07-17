import React from 'react';
import './ButtonSpinner.css';

const ButtonSpinner = () => {
  return (
    <div style={{background: "#EA3043", width: '20px', height: '24px', display: "flex", alignItems: 'center'}}>
      <div className="btn-spinner"></div>
    </div>
  );
};

export default ButtonSpinner;