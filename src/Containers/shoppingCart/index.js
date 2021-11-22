import { getProducts, formatOrderProducts, removeAllChilds } from '../../../utils/utils.js'
import finalSummary from '../finalSummary/index.js';

export default class ShoppingCart {
  constructor() {
    this.root = document.getElementById('main')
    this.cartState = {
      items: 0,
      total: 0,
      shipping: '5',
      promoCode: '',
      subtotal:0,
      totalCost: 0,
      productsOriginalOrder: [],
      actualProductsOrder: []
    }
    this.validDiscount = { code: 'FIRST10', percentDiscount: 10 };
  }

  async renderCart(actualOrder) {
    this.cartState.productsOriginalOrder = await getProducts();
    let total;
    let result;

    if (this.root.hasChildNodes()) {
      removeAllChilds(this.root);
    }

    if (actualOrder) {
      this.cartState.actualProductsOrder = actualOrder;
    } else {
      this.cartState.actualProductsOrder = formatOrderProducts(this.cartState.productsOriginalOrder)
      total = this.cartState.actualProductsOrder.reduce((sum, { items }) => sum + items, 0)
      result = (this.cartState.actualProductsOrder.reduce((sum, { priceTotal }) => sum + priceTotal, 0) + Number(this.cartState.shipping)).toFixed(2);
      this.setActualState({...this.cartState,items:total,subtotal:result,totalCost:result},false)
    }
    this.root.innerHTML += `  
    <div class="row cartSection">
    <div class="col shoppingCart-section">
      <div class="row headerCart">
        <div class="title">
          <h1>Shopping Cart</h1>
        </div>
        <div class="itemsCount">
          <h1>${this.cartState.items} Items</h1>
        </div>
      </div>
      <div id="tableSection" class='rowTable'>
        <table id="pTable">
          <tr>
            <th >
              PRODUCT DETAILS
            </th>
            <th >
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
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
        <a class="btn-back">Continue Shopping</a>
      </div>
    </div>
    <div id="summarySection" class='col colSummary'>
    <div class='formContainer'>
      <form id='formSummary'>
        <div class="row titleOrder">
          <h2>Order Summary</h2>
        </div>
        <div class='row subTotalSummary'> 
          <div class='col'>
            <h3> Items ${this.cartState.items}</h3>
          </div>
          <div  class='col'>
            <label>$${this.cartState.subtotal}</label>
          </div>
        </div>
        <div class="inputSection">
          <label for='shippingSelect'>SHIPPING</label>
          <select name='shippingSelect' id='shippingSelect' required>
            <option value="5" ${this.cartState.shipping === '5' ? 'selected' : ''}>Standard delivery - $5.00</option>
            <option value="15"  ${this.cartState.shipping === '15' ? 'selected' : ''}>express delivery - $15.00</option>
          </select>
        </div>
        <div class="inputSection">
          <label for='promoInput'>PROMO CODE</label>
          <input type='text' id='promoInput' name='promoInput' value="${this.cartState.promoCode}">
        </div>
        <div class=' promoSection'>
          <button type='button' id='promoAction' class='btn-apply'>APPLY</button>
        </div>
        <hr>
        <div class='row totalSummary'>
          <div>
            <h3>TOTAL COST</h3>
          </div>
          <div>
            <h3>$${this.cartState.totalCost}</h3>
          </div>
        </div>
        <div>
          <button type='submit' id='checkout' class="btn-check" >CHECKOUT</button>
        </div>
        <form>
        </div>
          <div>
          </div>`
    var tableId = document.getElementById('pTable');
    this.bodyTable= tableId.getElementsByTagName("tbody")[0];
    this.cartState.actualProductsOrder.forEach((product) => {
      this.bodyTable.innerHTML += `
       <tr class="centralRow">
           <td >
           <div class="detailProduct">
           <div class="col">
           <img src="${product.image}" width="60">
           </div>
           <div class="col">
           <h5>${product.title}</h5>
           <p>${product.category}</p>
           <button type='button' class='removeProduct' name='removeProduct'>REMOVE</button>
           </div>
             </div>
           </td>
           <td >
           <div class="quantityControls">
             <button type='button' class='btn-table decreaseProduct' data-origin="${product.id}" name='decreaseProduct'>-</button>
             <input type="number" class="inputQuantity" id="${'items' + product.id}" name="totalItems" value="${product.items}">
             <button type='button' class='btn-table incrementProduct' data-origin="${product.id}"  name='incrementProduct'>+</button>
             </div>
           </td>
           <td>
             <label>$${product.price}</label>
           </td>
           <td>
             <label>$${product.priceTotal}</label>
           </td>
         </tr> 
         `
    })
    this.handleEvents()
  }

  setActualState(state,render) {
    if (state !== this.cartState) {
      this.cartState = Object.assign(this.cartState, state);
      console.log(render)
      if(render){
        this.renderCart(this.cartState.actualProductsOrder)
      }
    }
  }

  setDecreaseItems(id) {
    let actualProduct = this.cartState.actualProductsOrder.filter(product => {
      return Number(product.id) === Number(id)
    })[0]
    if (actualProduct.items > 0) {
      let totalItems = actualProduct.items - 1
      const newOrder = this.cartState.actualProductsOrder.map((product) => {
        if (product.id === actualProduct.id) {
          return { ...product, items: totalItems, priceTotal: totalItems * actualProduct.price }
        } else {
          return product
        }
      })
      const total = newOrder.reduce((sum, { items }) => sum + items, 0)
      const result = newOrder.reduce((sum, { priceTotal }) => sum + priceTotal, 0)
      this.setActualState({ ...this.cartState, actualProductsOrder: newOrder, items: total, subtotal: result.toFixed(2) },true)
    }
  }

  setIncrementOrder(id) {
    let actualProduct = this.cartState.actualProductsOrder.filter(product => {
      return Number(product.id) === Number(id)
    })[0]
    if (actualProduct.items >= 0) {
      let totalItems = actualProduct.items + 1
      const newOrder = this.cartState.actualProductsOrder.map((product) => {
        if (product.id === actualProduct.id) {
          console.log({ ...product, items: totalItems, priceTotal: totalItems * actualProduct.price })
          return { ...product, items: totalItems, priceTotal: totalItems * actualProduct.price }
        } else {
          return product
        }
      })
      const finalItems = newOrder.reduce((sum, { items }) => sum + items, 0);
      const subtotal =  newOrder.reduce((sum, {priceTotal}) => sum + priceTotal, 0);
      const diference =   Number(subtotal) - Number(this.cartState.totalCost) ;
      const newTotal = Number(this.cartState.totalCost) + Number(diference)
      console.log(Number(this.cartState.totalCost),Number(subtotal),newTotal, diference )
      this.setActualState({ ...this.cartState, actualProductsOrder: newOrder, items: finalItems, subtotal: subtotal.toFixed(2),totalCost: newTotal.toFixed(2)},true)
    }
  }

  onSubmitCheckout(summary) {
    this.finalSummary = new finalSummary(summary);
    this.finalSummary.init();
  }

  onApplyPromo(promoCode) {
    if (promoCode === this.validDiscount.code) {
      const discount = this.validDiscount.percentDiscount / 100;
      const totalWithDiscount = this.cartState.subtotal - (this.cartState.subtotal * discount)
      this.setActualState({ ...this.cartState, promoCode: promoCode, totalCost: totalWithDiscount.toFixed(2) },true)
    }
  }

  handleEvents() {
    const formSummary = document.getElementById('formSummary');
    const promoButton = document.getElementById('promoAction');
    const inputShipping = formSummary.elements['shippingSelect'];
    const inputPromo = formSummary.elements['promoInput'];
    const decreButtons = document.getElementsByClassName('decreaseProduct');
    const increButtons = document.getElementsByClassName('incrementProduct');
    const btnDecreColection = [...decreButtons];
    const btnIncreColection = [...increButtons];
    ///events
    promoButton.onclick = () => {
      const promocode = inputPromo.value.trim();
      console.log(promocode)
      this.onApplyPromo(promocode)
    }
    inputShipping.onchange = () => {
      const shippingValue = inputShipping.value.trim();
      const shippingPlusPrice =  Number(this.cartState.subtotal) + Number(shippingValue)
      this.setActualState({ ...this.cartState, shipping: shippingValue ,totalCost: shippingPlusPrice},true)
    }
    formSummary.onsubmit = (event) => {
      event.preventDefault();
      this.onSubmitCheckout();
    }
    btnDecreColection.forEach((button) => button.onclick = () => {
      let attribute = button.getAttribute("data-origin");
      this.setDecreaseItems(attribute)
    });
    btnIncreColection.forEach((button) => button.onclick = () => {
      let attribute = button.getAttribute("data-origin");
      this.setIncrementOrder(attribute)
    });
  }

  init() {
    this.renderCart();
  }
}
