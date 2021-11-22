
export default class FinalSummary {

    constructor(summaryInfo) {
        this.root = document.getElementById('container')
        this.summaryInfo = {
            totalItems: 0,
            totalCost:0,
            shipping:0
        }
        this.productsInfo = []

    }

    renderSummary() {
        this.root.innerHTML += `
        <div id='loginSection'>
        <div class="row">
          <h1>Login</h1>
        </div>
        <div>
          <form id='formLogin'>
          <div>
            <label for="userName">
              username
            </label>
            <input type="text" id="userName" name="userName" placeholder="Type your username">
            <small></small>
          </div>
          <div>
            <label for="password">
             password
            </label>
            <input type="text" id="password" name="password"  placeholder="Type your password">
            <small></small>
            <a href="/">Forgot password?</a>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <div>
            <p>Or sign Up using</p>
            <a href="/">SIGN UP</a>
          </div>
        </form>
        </div>
      </div>`
    }


    init() {
        console.log('login')
        this.renderForm()

    }
}