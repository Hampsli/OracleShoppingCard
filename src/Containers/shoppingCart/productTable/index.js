import { getProducts,formatOrderProducts,removeAllChilds } from '../../../utils/utils.js'

export default class ProductTable {
  constructor() {
    this.productsRows = ''
    this.productsOriginalOrder = []
    this.actualProductsOrder =[]
  }

  async renderCart(actualOrder) {
    this.root = document.getElementById('tableSection')

    if (this.root.hasChildNodes()) {
      removeAllChilds(this.root);
    }
    this.productsOriginalOrder= await getProducts();

    if(actualOrder){
      this.actualProductsOrder = actualOrder;
    }else{
      this.actualProductsOrder = formatOrderProducts(this.productsOriginalOrder)
    }
    this.root.innerHTML +=`
      <table id="pTable">
      <tr>
        <th colspan="2">
          PRODUCT DETAILS
        </th>
        <th>
         QUANTITY
        </th>
        <th>
          PRICE
         </th>
         <th>
         TOTAL
         </th>
      </tr>
      </table>`
      this.rows = document.getElementById('pTable')
      this.actualProductsOrder.forEach((product) => {
        this.rows.innerHTML += `
        <tr>
            <td>
              <img src="${product.image}" width="70">
            </td>
            <td>
              <h5>${product.title}</h5>
              <p>${product.category}</p>
              <button type='button' class='removeProduct' name='removeProduct'>REMOVE</button>
            </td>
            <td>
              <button type='button' class='decreaseProduct' data-origin="${product.id}" name='decreaseProduct'>-</button>
              <input type="number" id="${'items'+product.id}" name="totalItems" value="${product.items}">
              <button type='button' class='incrementProduct' data-origin="${product.id}"  name='incrementProduct'>+</button>
            </td>
            <td>
              <label>${product.price}</label>
            </td>
            <td>
              <label>${product.priceTotal}</label>
            </td>
          </tr> 
         `
      })  
      this.handleEvents()

  }

  setActualOrder(actualProducts){
    if (actualProducts !== this.actualProductsOrder) {
      this.actualProductsOrder = Object.assign( this.actualProductsOrder,actualProducts);
      this.renderCart(this.actualProductsOrder);
    }
  }

  setDecreaseItems(id){
    let actualProduct = this.actualProductsOrder.filter(product => {
      return Number(product.id) === Number(id)
    })[0]
    if(actualProduct.items > 0){
      let totalItems = actualProduct.items-1
      const newOrder = this.actualProductsOrder.map((product)=>{
        if(product.id === actualProduct.id ){
          return  {...product,items:totalItems , priceTotal: totalItems * actualProduct.price}
        }else{
          return product
        }
      })
      this.setActualOrder(newOrder)
    }
  }

  setIncrementOrder (id){
    let actualProduct = this.actualProductsOrder.filter(product => {
      return Number(product.id) === Number(id)
    })[0]
    if(actualProduct.items >= 0){
      let totalItems = actualProduct.items + 1
      const newOrder = this.actualProductsOrder.map((product)=>{
        if(product.id === actualProduct.id ){
          return  {...product,items:totalItems , priceTotal: totalItems * actualProduct.price}
        }else{
          return product
        }
      })
      this.setActualOrder(newOrder)
    }
  }

  handleEvents(){
    const decreButtons = document.getElementsByClassName('decreaseProduct');
    const increButtons = document.getElementsByClassName('incrementProduct');
    const btnDecreColection =  [...decreButtons];
    const btnIncreColection = [...increButtons];
    btnDecreColection.forEach((button)=> button.onclick= () =>{    
      let attribute = button.getAttribute("data-origin");
      this.setDecreaseItems(attribute)
  });
    btnIncreColection.forEach((button)=> button.onclick= () =>{    
      let attribute = button.getAttribute("data-origin");
      this.setIncrementOrder(attribute)
  });
} 


  init() {
    this.renderCart()

  }
}


