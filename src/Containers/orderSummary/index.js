import { removeAllChilds } from '../../utils/utils.js';
import finalSummary from '../finalSummary/index.js';

export default class OrderSummary {
  constructor(summary) {
    this.summaryState = {
      items: 0,
      total: 100,
      shipping: '',
      promoCode: '',
      totalCost: 0
    }
    this.validDiscount = { code: 'FIRST10', percentDiscount: 10 };

  }

  setSummary(summary) {
    console.log(summary !== this.summaryState)
    if (summary !== this.summaryState) {
      this.summaryState = Object.assign(this.summaryState, summary);
      this.render();
    }
  }

  render() {
    this.root = document.getElementById("summarySection")
    if (this.root.hasChildNodes()) {
      removeAllChilds(this.root);
    }
    this.root.innerHTML += `
    <form  id='formSummary'>
        <div>
        <h1>Order Summary</h1>
        </div>
        <hr>
        <div>
        <div>
          <h3> Items ${this.summaryState.items}</h3>
        </div>
        <div>
          <label>${this.summaryState.total}</label>
        </div>
        </div>
        <div>
        <label for='shippingSelect'>SHIPPING</label>
        <select name='shippingSelect' id='shippingSelect' required>
        <option value="0">Standard delivery - $5.00</option>
        <option value="1">express delivery - $15.00</option>
        </select>
        </div>
        <div>
        <label for='promoInput'>PROMO CODE</label>
        <input type='text' id='promoInput' name='promoInput' value="${this.summaryState.promoCode}">
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
          <h3>${this.summaryState.totalCost}</h3>
        </div>
        </div>
        <div>
        <button type='submit' id='checkout'>CHECKOUT</button>
        </div>
        <form>
        `
  }

  onSubmitCheckout(summary) {
    this.finalSummary = new finalSummary(summary);
    this.finalSummary.init();
  }

  onApplyPromo(promoCode) {
    if (promoCode === this.validDiscount.code) {
      const discount = this.validDiscount.percentDiscount / 100;
      const totalWithDiscount = this.summaryState.total - (this.summaryState.total * discount)
      this.setSummary({ ...this.summaryState, promoCode: promoCode, totalCost: totalWithDiscount })
    }
  }

  handleEvents() {
    const formSummary = document.getElementById('formSummary');
    const promoButton = document.getElementById('promoAction');
    const inputShipping = formSummary.elements['shippingSelect'];
    const inputPromo = formSummary.elements['promoInput'];
    ///events
    promoButton.onclick = () => {
      const promocode = inputPromo.value.trim();
      this.onApplyPromo(promocode)
    }
    inputShipping.onchange = () => {
      const shippingValue = inputShipping.value.trim();
      this.setSummary({ ...this.summaryState, shipping: shippingValue })
    }
    formSummary.onsubmit = (event) => {
      event.preventDefault();
      this.onSubmitCheckout();
    }
  }

  init() {
    this.render();
    this.handleEvents();
  }
}



