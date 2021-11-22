import productTable from './productTable/index.js'
import orderSummary from '../orderSummary/index.js'

export default class ShoppingCart {
    constructor() {
      this.root = document.getElementById('container')
      this.products = []
      this.summary = {
        items: 0,
        total:0,
      }
      this.table = new productTable(this.products);
      this.orderSummary = new orderSummary(this.summary);
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
      let totalItems = this.products.length;

      this.root.innerHTML += `
      <div class="cartSection">
        <div class="col shoppingCart-section">
          <div class="row">
            <div class="title">
              <h1>Shopping Cart</h1>
            </div>
          <div class="itemsCount">
            <h1>${totalItems} Items</h1>
          </div>
        </div>
        <hr>
        <div id="tableSection" class='rowTable'>
        </div>
        <div class='backButton'>
          <a>Continue Shopping</a>
        </div>
      </div>
      <div id="summarySection" class='colSummary'><div>
    </div>`

    this.tableSection = document.getElementById('tableSection')
    this.summarySection= document.getElementById('summarySection')
  }

  renderTable(products){
    if (this.tableSection.hasChildNodes()) {
      this.tableSection.removeChild(this.tableSection.firstChild);
    }
    this.table.init(products);
  }

  renderOrderSummary(summary){
    if (this.summarySection.hasChildNodes()) {
      this.summarySection.removeChild(this.summarySection.firstChild);
    }
    this.orderSummary.init(summary);
  }

    init() {
      this.renderCart();
     this.renderTable(this.products);
      this.renderOrderSummary(this.summary);
    }
}
