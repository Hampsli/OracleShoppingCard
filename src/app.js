import renderLogin from './components/login/index.js'

export default class AppMain {
    constructor() {
        this.state = {
            page: 'login'
        }
        this.login = new renderLogin();
    }

    init() {
        const { page } = this.state;
        if (page === 'login') {
            console.log('init')
            this.login.init()
            const formLogin = document.getElementById('formLogin');
            formLogin.addEventListener('submit', (event) => {
                event.preventDefault();
                this.login.onSubmitLogin(formLogin);
            })
        }
    }
}
window.onload = () => {
    const appMain = new AppMain();
    appMain.init();
};