import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from "react-router-dom"
import Navbar from './component/Navbar';
import Prodectlist from './component/Prodectlist';
import Details from './component/Details';
import Cart from './component/cart/Cart';

import Diflt from './component/Diflt';
export default class App extends Component {
  render() {
    return (


      <React.Fragment>

        <Navbar />

        <Routes >
          <Route exact path='/' element={<Prodectlist />} />
          <Route path='/dital' element={<Details />} />
          <Route path='/cart' element={<Cart />} />
          <Route element={<Diflt />} />
        </Routes>




      </React.Fragment>)
  }
}
