
export default class ProductTable {
    constructor() {
      this.root = document.getElementById('container')
    }

    renderCart() {
      console.log('renderForm')
      this.root.removeChild(this.root.firstChild);
      this.root.innerText+= `<table>
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
      <tr>
        <td>
          <img>
        </td>
        <td>
          <h5>title game</h5>
          <p>console</p>
          <a>REMOVE</a>
        </td>
        <td>
          <button>-</button>
          <input>
          <button>+</button>
        </td>
        <td>
          <label>44.00</label>
        </td>
        <td>
          <label>44.00</label>
        </td>
      </tr>
      </table>`
  }

    init() {
      console.log('shopping cart')
      this.renderCart()
    }
}


