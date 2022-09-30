import React, { Component } from 'react'
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();

 class ProductProvider extends Component {
     state ={
             products:  storeProducts,
    detailProduct: detailProduct,
       cart: [] ,
           modalOpen: true,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
     }
       componentDidMount() {
    this.setProducts();
  }
      setProducts = () => {
    let tempprodects = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempprodects = [...tempprodects, singleItem];
    });
    this.setState(() => {
      return { products : tempprodects };
    }, this.checkCartItems);
  };

   getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };


       handleDetail = id => { 
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    }); 
  };
  addToCart = id => {
     
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(() => {
      return {
        products: tempProducts, cart: [...this.state.cart,product]
      };

    },()=>{
      this.addTotals()
    } );
  };

   openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

    closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

    increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(() => {
      return {
        cart: [...tempCart]
      };
    }, this.addTotals);
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };

   removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      };
    }, this.addTotals);
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  
   addTotals = () => {
   let subtotal = 0
   this.state.cart.map(item => (subtotal += item.total))
   const tempTax =subtotal * 0.1
   const tax = parseFloat(tempTax.toFixed(2))
   const total =subtotal + tax 
   this.setState(()=>{
     return {
       cartSubTotal: subtotal,
       cartTax : tax,
       cartTotal : total
     }
   })
  };

  render() {
    return (
     <ProductContext.Provider value={{
            ...this.state,
                 handleDetail: this.handleDetail,
              addToCart: this.addToCart,
              openModal: this.openModal,
              increment: this.increment,
              decrement: this.decrement,
              removeItem: this.removeItem,
              clearCart: this.clearCart,
     }} >
         {this.props.children}
     </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
