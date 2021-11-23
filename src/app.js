import renderLogin from './Containers/login/index.js'
import rendershopping from './Containers/shoppingCart/index.js'
import "./style.css";

export default class AppMain {
  constructor(state) {
    this.state = {
      page: 'login'
    }
    this.login = new renderLogin();
    this.shopping = new rendershopping();
    if (state) {
      this.state = Object.assign(this.state, state);
    }
  }

  setState(state) {
    if (state.page && state.page !== this.state.page) {
      this.state = Object.assign(this.state, state);
      this.init();
    } else {
      this.state = Object.assign(this.state, state);
    }
  }

  init() {
    const { page } = this.state;
    if (page === 'login') {
      this.login.init()
      const formLogin = document.getElementById('formLogin');
     formLogin.addEventListener('submit', (event) => {
       event.preventDefault();
       let validSubmit = this.login.onSubmitLogin(formLogin);
        if(validSubmit){
         this.setState({page:'shopping'})
       }
       })
    }
    if(page === 'shopping'){
     this.shopping.init()
    }
  }
}
window.onload = () => {
  const appMain = new AppMain();
  appMain.init();
};