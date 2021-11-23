import {removeAllChilds } from '../../../utils/utils.js'

export default class ShoppingCart {
    constructor(state) {
      this.root = document.getElementById('main')
      this.cartState = {
        items: 0,
        shipping: '5',
        promoCode: '',
        totalCost: 0,
        productsOriginalOrder: [],
        actualProductsOrder: []
      }
      if (state) {
        this.cartState = Object.assign(this.cartState, state);
      }
    }
    renderRecip() {
  
      if (this.root.hasChildNodes()) {
        removeAllChilds(this.root);
      }
  
      this.root.innerHTML += `  
      <div class="recipSummarySection">
      <div class="shoppingRecip-section">
      <h5>THANKYOU FOR YOUR ORDER!!<h5>
        <div class="row headerRecip">
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
      </div>
      <div id="summarySection" class='row colRecip'>
      <div class='recipContainer'>
          <div style="border-bottom: 2px solid black" class="row titleRecip">
            <h2>Recip Summary</h2>
          </div>
          <div class='row contentCenter'> 
            <div class='col'>
              <h3> Items ${this.cartState.items}</h3>
            </div>
            <div  class='col'>
              <label>$${this.cartState.subtotal}</label>
            </div>
          </div>
          <div class="row contentCenter">
            <label >SHIPPING: </label>
            <label>${this.cartState.shipping.label}</label>
          </div>
          <div class="row contentCenter">
            <label >PROMO CODE :</label>
            <label>${this.cartState.promoCode}</label>
          </div>
          <hr>
          <div class='row contentCenter'>
            <div>
              <h3>TOTAL COST:</h3>
            </div>
            <div style='margin-left: 1rem'>
              <h3>$${this.cartState.totalCost}</h3>
            </div>
          </div>
          <div>
          </div>
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
             </div>
               </div>
             </td>
             <td >
             <div class="quantityControls">
               <input disabled type="number" class="inputQuantity" id="${'items' + product.id}" name="totalItems" value="${product.items}">
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
    }

    init() {
      this.renderRecip();
    }
}
