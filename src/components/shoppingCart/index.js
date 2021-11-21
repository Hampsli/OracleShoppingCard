import productTable from './productTable/index.js'
import orderSummary from '../orderSummary/index.js'

export default class ShoppingCart {
    constructor() {
      this.root = document.getElementById('container')
      this.table = new productTable();
      this.orderSummary = new orderSummary();
      this.products = []
      this.summary = {
        items: 0,
        total:0,
        shipping: '',
        promoCode:'',
        totalCost: 0
      }
    }

    setProducts(products) {
      console.log(products)
    }

    setSummary(summary) {
      console.log(summary)
    }

    renderCart() {
      if (this.root.hasChildNodes()) {
        this.root.removeChild(this.root.firstChild);
      }

      this.root.innerHTML += `<div class='cartSection'>
      <div class='col shoppingCart-section'>
        <div class='row'>
          <div class='title'>
            <h1>Shopping Cart</h1>
          </div>
          <div class='itemsCount'>
            <h1> Items</h1>
          </div>
        </div>
        <hr>
        <div class='rowTable'>
        </div>
        <div class='backButton'>
          <a>Continue Shopping</a>
        </div>
      </div>
    </div>`
  }

  renderTable(){

  }

  renderOrderSummary(){
    
  }

    init() {
      this.renderCart()
    }
}
