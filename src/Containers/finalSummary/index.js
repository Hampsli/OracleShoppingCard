import {removeAllChilds } from '../../../utils/utils.js'

export default class ShoppingCart {
    constructor(state) {
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
      if (state) {
        this.state = Object.assign(this.cartState, state);
      }
    }

  renderRecip() {
      if (this.root.hasChildNodes()) {
        removeAllChilds(this.root);
      }
      this.root.innerHTML += `
      <div class="cartSection">
        <div class="col shoppingCart-section">
          <div class="row">
            <div class="title">
              <h1>Shopping Cart</h1>
            </div>
          <div class="itemsCount">
            <h1>${0} Items</h1>
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
        <label>${0}</label>
      </div>
      </div>
      <div>
      <label for='shippingSelect'>SHIPPING</label>
        <Label>>${0}</label>
      </div>
      <div>
      <label for='promoInput'>PROMO CODE</label>
      <input disabled type='text' id='promoInput' name='promoInput' value="${ this.cartState.promoCode}">
      </div>
      <div>
      </div>
      <hr>
      <div>
      <div>
        <h3>TOTAL COST</h3>
      </div>
      <div>
        <h3>${0}</h3>
      </div>
      </div>
      <div>
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
             <input disabled type="number" id="${'items'+product.id}" name="totalItems" value="${product.items}">
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
  }

    init() {
      this.renderRecip();
    }
}
