const register = document.querySelector('.btn-transfer-register');
const login =document.querySelector('.btn-transfer-login');
const container = document.querySelector('.container');
register.addEventListener(('click'), () => {
   container.classList.add('active');
})
login.addEventListener(('click'), ()=>{
   container.classList.remove('active')
})