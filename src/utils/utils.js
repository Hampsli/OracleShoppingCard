export const removeAllChilds = (el) => {
    if (el) {
      while (el.lastChild) {
        el.removeChild(el.lastChild);
      }
    }
  };
 

export const getProducts = async() =>{
    let request = new Request('/products.json',{
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        },
        mode: 'cors',
        cache:'default'
    });
    try {
        let data = await fetch( request)
        let products = await data.json();
        return products 
    } catch (error) {
        console.log(error);
        alert('Ups! we have a little problem, please contact with our sales team!');
    }

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
