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
