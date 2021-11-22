import { getProducts,formatOrderProducts,removeAllChilds } from '../../../utils/utils.js'
import finalSummary from '../finalSummary/index.js';

export default class ShoppingCart {
    constructor() {
      this.root = document.getElementById('container')
      this.cartState = {
        items: 0,
        total: 0,
        shipping: '5',
        promoCode: '',
        totalCost: 0,
        productsOriginalOrder: [],
        actualProductsOrder: []
      }
      this.validDiscount = { code: 'FIRST10', percentDiscount: 10 };
    }

    async renderCart(actualOrder) {
      this.cartState.productsOriginalOrder = await getProducts();
    
      if (this.root.hasChildNodes()) {
        removeAllChilds(this.root);
      }
  
      if(actualOrder){
       this.cartState.actualProductsOrder = actualOrder;
      }else{
       this.cartState.actualProductsOrder = formatOrderProducts( this.cartState.productsOriginalOrder)
      }

      const total = this.cartState.actualProductsOrder.reduce( ( sum, { items} ) => sum + items , 0)
      console.log( this.cartState.shipping === '5' ? false : true)
      const result = (this.cartState.actualProductsOrder.reduce( ( sum, { priceTotal} ) => sum + priceTotal , 0) + Number(this.cartState.shipping) ).toFixed(2);

      this.root.innerHTML += `
      <div class="cartSection">
        <div class="col shoppingCart-section">
          <div class="row">
            <div class="title">
              <h1>Shopping Cart</h1>
            </div>
          <div class="itemsCount">
            <h1>${total} Items</h1>
          </div>
        </div>
        <hr>
        <div id="tableSection" class='rowTable'>
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
        </table>
        </div>
        <div class='backButton'>
          <a>Continue Shopping</a>
        </div>
      </div>
      <div id="summarySection" class='colSummary'>
      <form  id='formSummary'>
      <div>
      <h1>Order Summary</h1>
      </div>
      <hr>
      <div>
      <div>
        <h3> Items ${ this.cartState.items}</h3>
      </div>
      <div>
        <label>${total}</label>
      </div>
      </div>
      <div>
      <label for='shippingSelect'>SHIPPING</label>
      <select name='shippingSelect' id='shippingSelect' required>
      <option value="5" >Standard delivery - $5.00</option>
      <option value="15">express delivery - $15.00</option>
      </select>
      </div>
      <div>
      <label for='promoInput'>PROMO CODE</label>
      <input type='text' id='promoInput' name='promoInput' value="${ this.cartState.promoCode}">
      </div>
      <div>
      <button type='button' id='promoAction'>APPLY</button>
      </div>
      <hr>
      <div>
      <div>
        <h3>TOTAL COST</h3>
      </div>
      <div>
        <h3>${result}</h3>
      </div>
      </div>
      <div>
      <button type='submit' id='checkout'>CHECKOUT</button>
      </div>
      <form>
      <div>
    </div>`

    this.rows = document.getElementById('pTable')
    this.cartState.actualProductsOrder.forEach((product) => {
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


setActualState(state){
  if (state !== this.cartState) {
    this.cartState = Object.assign( this.cartState,state);
    this.renderCart(this.cartState.actualProductsOrder)
  }
}

  setDecreaseItems(id){
    let actualProduct =this.cartState.actualProductsOrder.filter(product => {
      return Number(product.id) === Number(id)
    })[0]
    if(actualProduct.items > 0){
      let totalItems = actualProduct.items-1
      const newOrder =this.cartState.actualProductsOrder.map((product)=>{
        if(product.id === actualProduct.id ){
          return  {...product,items:totalItems , priceTotal: totalItems * actualProduct.price}
        }else{
          return product
        }
      })
      const total = newOrder.reduce( ( sum, { items} ) => sum + items , 0)
      const result = newOrder.reduce( ( sum, { priceTotal} ) => sum + priceTotal , 0) + Number(this.cartState.shipping)
      this.setActualState({...this.cartState,actualProductsOrder:newOrder,items:total,totalCost: result.toFixed(2) })
    }
  }

  setIncrementOrder (id){
    let actualProduct =this.cartState.actualProductsOrder.filter(product => {
      return Number(product.id) === Number(id)
    })[0]
    if(actualProduct.items >= 0){
      let totalItems = actualProduct.items + 1
      const newOrder =this.cartState.actualProductsOrder.map((product)=>{
        if(product.id === actualProduct.id ){
          return  {...product,items:totalItems , priceTotal: totalItems * actualProduct.price}
        }else{
          return product
        }
      })
      const total =newOrder.reduce( ( sum, { items} ) => sum + items , 0)
      const result = newOrder.reduce( ( sum, { priceTotal} ) => sum + priceTotal , 0) + Number(this.cartState.shipping)
      this.setActualState({...this.cartState,actualProductsOrder:newOrder,items:total,totalCost: result.toFixed(2)   })
    }
  }

onSubmitCheckout(summary) {
  this.finalSummary = new finalSummary(summary);
  this.finalSummary.init();
}

onApplyPromo(promoCode) {
  if (promoCode === this.validDiscount.code) {
    const discount = this.validDiscount.percentDiscount / 100;
    const totalWithDiscount =  this.cartState.total - ( this.cartState.total * discount)
    this.setActualState({...this.cartState, promoCode: promoCode, totalCost: totalWithDiscount })
  }
}

handleEvents() {
  const formSummary = document.getElementById('formSummary');
  const promoButton = document.getElementById('promoAction');
  const inputShipping = formSummary.elements['shippingSelect'];
  const inputPromo = formSummary.elements['promoInput'];
  const decreButtons = document.getElementsByClassName('decreaseProduct');
  const increButtons = document.getElementsByClassName('incrementProduct');
  const btnDecreColection =  [...decreButtons];
  const btnIncreColection = [...increButtons];
  ///events
  promoButton.onclick = () => {
    const promocode = inputPromo.value.trim();
    this.onApplyPromo(promocode)
  }
  inputShipping.onchange = () => {
    const shippingValue = inputShipping.value.trim();
    this.setActualState({...this.cartState, shipping: shippingValue })
  }
  formSummary.onsubmit = (event) => {
    event.preventDefault();
    this.onSubmitCheckout();
  }
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
      this.renderCart();
    }
}
