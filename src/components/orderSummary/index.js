
export default class OrderSummary {
  constructor(summary) {
    console.log(document)
    this.summaryState = {
      items: 0,
      total: 0,
      shipping: '',
      promoCode: '',
      totalCost: 0
    }

    if (summary) {
      this.summaryState = Object.assign(this.summaryState, summary);
    }
  }

  setSummary(summary) {
    if (summary !== this.summaryState) {
      this.summaryState = Object.assign(this.summaryState, summary);
      this.render();
    }
  }

  render() {
    this.root = document.getElementById("summarySection")
    if (this.root.hasChildNodes()) {
      this.root.removeChild(this.root.firstChild);
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
        <input type='text' id='promoInput' name='promoInput'>
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

  onSubmitCheckout(){

  }

  onApplyPromo(){

  }

  onChangeShipping(){

  }

  handleEvents(){
    const formSummary = document.getElementById('formSummary'); 
    const promoButton = document.getElementById('promoAction'); 
    const inputShipping =  formSummary .elements['shippingSelect'];
    ///events
   formSummary.onsubmit = (event) =>{
     console.log(event)
    alert('did stuff #2'); 
   }
   console.log(promoButton)
   promoButton.onclick = (event)=> { 
   alert('did stuff #1'); 
   }
   inputShipping.onchange=(event)=>{

     alert('change')
   }
  }
  

  init() {
    this.render();
    this.handleEvents();

  }
}



