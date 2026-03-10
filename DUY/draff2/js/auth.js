

const usernameLogin = localStorage.getItem('account-Name');
const passwdLogin = localStorage.getItem('account-Passwd');

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const form = document.querySelector(".form-login");

localStorage.setItem('login' ,window.location.href );

const authentication = () => {
   
    if(username.value === usernameLogin && password.value === passwdLogin){
      localStorage.setItem('isLoggedIn','true');
      localStorage.setItem('username' , usernameLogin);
        alert("đăng nhập thành công");
        const redirect = localStorage.getItem('redirectURL');
        localStorage.removeItem('redirectURL')
        if(redirect) window.location.href = redirect;
        window.location.href = '/vohangtemp/index.html'

    }else{
        alert("đăng nhập không thành công! sai tên hoặc sai passwd");
    }
}


if(form){
    form.addEventListener('submit',(e)=>{
        e.preventDefault(); 
        authentication();
    });
}


