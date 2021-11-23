import { 
  getProducts, 
  formatOrderProducts, 
  removeAllChilds,
  getSubtotal,
  getCountItems} from '../../utils/utils.js'
import finalSummary from '../finalSummary/index.js';
import "../../style.css";


export default class ShoppingCart {
  constructor() {
    this.root = document.getElementById('main')
    this.cartState = {
      items: 0,
      shipping:{
        value: '5',
        label: 'Standard delivery - $5.00'
      } ,
      promoCode: '',
      subtotal:0,
      totalCost: 0,
      productsOriginalOrder: [],
      actualProductsOrder: []
    }
     this.totalItems=0;
    this.subtotal=0;
    this.validDiscount = { code: 'FIRST10', percentDiscount: 10 };
  }

  async renderCart(actualOrder) {
    this.cartState.productsOriginalOrder = await getProducts();

    if (this.root.hasChildNodes()) {
      removeAllChilds(this.root);
    }

    if (actualOrder) {
      this.cartState.actualProductsOrder = actualOrder;
    } else {
      this.cartState.actualProductsOrder = formatOrderProducts(this.cartState.productsOriginalOrder)
      this.totalItems = getCountItems( this.cartState.actualProductsOrder)
      this.subtotal = getSubtotal( this.cartState.actualProductsOrder);
      this.setActualState({...this.cartState,items:this.totalItems,subtotal:this.subtotal.toFixed(2)},true)
    }
    let disabled =  Boolean(!this.cartState.actualProductsOrder?.length);

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
            <option value="5" ${this.cartState.shipping.value === '5' ? 'selected' : ''}>Standard delivery - $5.00</option>
            <option value="15"  ${this.cartState.shipping.value === '15' ? 'selected' : ''}>express delivery - $15.00</option>
          </select>
        </div>
        <div class="inputSection">
          <label for='promoInput'>PROMO CODE</label>
          <input ${this.cartState.promoCode ? 'disabled' : ''} type='text' id='promoInput' name='promoInput' value="${this.cartState.promoCode}">
          <small></small>
          <p ${this.cartState.promoCode ? '' : 'hidden'}>using promo code : ${this.cartState.promoCode}<p>
        </div>
        <div class='promoSection'>
          <button ${this.cartState.promoCode ? 'hidden' : ''}   type='button' id='promoAction' class='btn-apply '>APPLY</button>
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
          <button ${disabled ? 'disabled' : ''} type='submit' id='checkout' class="btn-check" >CHECKOUT</button>
        </div>
        <form>
        </div>
          <div>
          </div>`
    var tableId = document.getElementById('pTable');
    this.bodyTable= tableId.getElementsByTagName("tbody")[0];
    if( this.cartState.actualProductsOrder?.length > 0){
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
               <input disabled type="number" class="inputQuantity" id="${'items' + product.id}" name="totalItems" value="${product.items}">
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
           `    })
    }else{
      this.bodyTable.innerHTML += `
      <tr>
        <td colspan="4"><h3 style='color:red'>products not found,please contact with sales team </h3></td>
      </tr> 
        `   
    }
    this.handleEvents()
  }

  setActualState(state) {
    let totalCost;
    if (state !== this.cartState) {
      if(state.promoCode){
        const discount = this.validDiscount.percentDiscount / 100;
        const totalWithDiscount = Number(state.subtotal) - (Number(state.subtotal) * discount)
        totalCost = Number(totalWithDiscount) + Number(state.shipping.value);
      }
      if(!state.promoCode){
        totalCost =  Number(state.subtotal) + Number(state.shipping.value);
      }
      this.cartState = Object.assign(this.cartState, {...state, totalCost: totalCost.toFixed(2)});
      this.renderCart(this.cartState.actualProductsOrder)
    }
  }

  calculateOrderStock(decre,incre,id){
    let validation
    let totalItemOrder
    let actualProduct = this.cartState.actualProductsOrder.filter(product => {
      return Number(product.id) === Number(id)
    })[0]
    if(decre){
      totalItemOrder = actualProduct.items - 1
      validation = actualProduct.items > 0
    }
    if(incre){
      totalItemOrder = actualProduct.items + 1
      validation = actualProduct.items >= 0
    }
    if (validation) {
      const newOrder = this.cartState.actualProductsOrder.map((product) => {
        if (product.id === actualProduct.id) {
          return { ...product, items:  totalItemOrder, priceTotal: totalItemOrder* actualProduct.price }
        } else {
          return product
        }
      })
      this.totalItems = getCountItems( this.cartState.actualProductsOrder)
      this.subtotal = getSubtotal( this.cartState.actualProductsOrder);
      this.setActualState({ ...this.cartState, actualProductsOrder: newOrder, items: this.totalItems, subtotal:  this.subtotal.toFixed(2) })
  }
}

  onSubmitCheckout(summary) {
    this.finalSummary = new finalSummary(summary);
    this.finalSummary.init();
  }

  onApplyPromo(promoCode,input) {
    console.log(promoCode)
    if (promoCode === this.validDiscount.code) {
      this.setActualState({ ...this.cartState, promoCode: promoCode })
    }else{
      let errorMsg = input.parentNode.querySelector("small");
      errorMsg.innerText = 'Invalid promo code'
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
    inputPromo.onchange = () =>{
      let errorMsg =  inputPromo.parentNode.querySelector("small");
      errorMsg.innerText 
      if(  errorMsg.innerText.length > 0){
        errorMsg.innerText = ''
      }
    }
    promoButton.onclick = () => {
      const promocode = inputPromo.value.trim();
      this.onApplyPromo(promocode,inputPromo)
    }
    inputShipping.onchange = () => {
      const shippingValue = inputShipping.value.trim();
      const shippingElement = document.getElementById('shippingSelect');
      const label =shippingElement.options[shippingElement.selectedIndex].innerHTML;
      this.setActualState({ ...this.cartState, shipping: {label: label,value:shippingValue}})
    }
    formSummary.onsubmit = (event) => {
      event.preventDefault();
      this.onSubmitCheckout(this.cartState);
    }
    btnDecreColection.forEach((button) => button.onclick = () => {
      let attribute = button.getAttribute("data-origin");
      this.calculateOrderStock(true,false,attribute)
    });
    btnIncreColection.forEach((button) => button.onclick = () => {
      let attribute = button.getAttribute("data-origin");
      this.calculateOrderStock(false,true,attribute)
    });
  }

  init() {
    this.renderCart()
  }
}
