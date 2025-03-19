import React from "react";
import { IoAddOutline } from "react-icons/io5";
import "./itemAdder.css";

function ItemAdder({onAddItem}) {

  return (
    <div className="itemAdder">
      <button onClik={onAddItem}><IoAddOutline/></button>
    </div>
  );
}

export default ItemAdder;
