
export default class OrderSummary {
    constructor() {
      this.root = document.getElementById('container')
    }

    renderCart() {
      console.log('renderForm')
      this.root.removeChild(this.root.firstChild);
      this.root.innerText+= `<div class='colSummary'>
      <div>
        <h1>Order Summary</h1>
      </div>
      <hr>
      <div>
        <div>
          <h1> Items</h1>
        </div>
        <div>
          <label>457.00</label>
        </div>
        </div>
      <div>
        <label>SHIPPING</label>
        <select></select>
      </div>
      <div>
        <label>PROMO CODE</label>
        <input>
      </div>
      <div>
        <button>APPLY</button>
      </div>
      <hr>
      <div>
        <div>
          <h3>TOTAL COST</h3>
        </div>
        <div>
          <h3>462</h3>
        </div>
      </div>
      <div>
        <button>CHECKOUT</button>
      </div>
      </div>`
  }

    init() {
      console.log('shopping cart')
      this.renderCart()
    }
}



