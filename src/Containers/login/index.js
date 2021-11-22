
export default class Login {

  constructor() {
    this.userName = "LilianOracle";
    this.password = "123Oracle";
    this.errorMsg = document.createElement('label')
    this.root = document.getElementById('main')

  }

  renderForm() {
    this.root.innerHTML += `
        <div id='loginSection'>
        <div class=" login-title">
          <h1>Login</h1>
        </div>
        <div>
          <form id='formLogin'>
          <div class="inputSection">
            <label for="userName">
              username
            </label>
            <input type="text" id="userName" name="userName" placeholder="Type your username">
            <small></small>
          </div>
          <div  class="inputSection">
            <label for="password">
             password
            </label>
            <input type="text" id="password" name="password"  placeholder="Type your password">
            <small></small>
          </div>
          <div class="forgot-pass">
          <a href="/">Forgot password?</a>
          </div>
          <div>
            <button type="submit" class="btn-login">Login</button>
          </div>
          <div class='loginFooter'>
            <p>Or sign Up using</p>
            <a href="/">SIGN UP</a>
          </div>
        </form>
        </div>
      </div>`
  }

  validUserName(userNameInput) {
    const userNameValue = userNameInput.value.trim();
    if (userNameValue !== "") {
      if (userNameValue === this.userName) {
        return true
      } else {
        let errorMsg = userNameInput.parentNode.querySelector("small");
        errorMsg.innerText = 'Invalid user name'
        return false
      }
    }
  }

  validPassword(passwordInput) {
    const passwordValue = passwordInput.value.trim();
    if (passwordValue !== "") {
      if (passwordValue === this.password) {
        return true
      } else {
        let errorMsg = passwordInput.parentNode.querySelector("small");
        errorMsg.innerText = 'Invalid password'
        return false
      }
    }
  }

  onSubmitLogin(formLogin) {
    const userNameValid = this.validUserName(formLogin.elements['userName']);
    const passwordValid = this.validPassword(formLogin.elements['password'])
    if (userNameValid && passwordValid) {
      return true
    }
  }

  init() {
    this.renderForm()

  }
}