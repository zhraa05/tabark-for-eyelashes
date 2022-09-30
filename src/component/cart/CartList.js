import React, { Component } from "react";
import CartItem from "./CartItem";
export default function CartList ({value})   {
  
    const { cart } = value;
  
    // const { cart } = this.props.value;
    return (
      <div className="container-fluid">
      {cart.map(item=>{
          return <CartItem key={item.id} item={item}  value ={value} />
      })}
      </div>
    );
  
}