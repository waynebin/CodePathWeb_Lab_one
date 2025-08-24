import React from "react";

function StockAttribute({ label, value }) {
  return (
    <div className="stock-attribute">
      <strong>{label}:</strong> {value}
    </div>
  );
}

export default StockAttribute;
