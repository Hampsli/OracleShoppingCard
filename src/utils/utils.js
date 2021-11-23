export const removeAllChilds = (el) => {
    if (el) {
      while (el.lastChild) {
        el.removeChild(el.lastChild);
      }
    }
  };

export const getProducts = async() =>{
    let data = await fetch('http://localhost/utils/products.json')
    let products = await data.json();
    return products 
}

export const formatOrderProducts = (products)=>{
    if(products){
        return  products.map((product)=>{
            return {...product, items:1,priceTotal:product.price}
        })
    }
    return []
}

export const getSubtotal = (orderItems) =>{
    if(orderItems){
        return (orderItems.reduce((sum, { priceTotal }) => sum + priceTotal, 0));
    }
    return 0
}

export const getCountItems = (orderItems) =>{
    if(orderItems){
        return  orderItems.reduce((sum, { items }) => sum + items, 0)
    }
    return 0
}
