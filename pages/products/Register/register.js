
const button_register = document.querySelector('.btn-primary');

function isValidEmail(email){
    let check =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return check.test(email);
}

button_register.addEventListener('click',(e)=>{
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const confirm_password = document.querySelector('#confirm_password').value;
    const email = document.querySelector('#email').value;

    if(username === '' || password === '' || confirm_password === '' || email === ''){
        alert('Vui lòng nhập đầy đủ thông tin');
    }
    else if(password !== confirm_password){
        alert('Mật khẩu xác nhận không khớp');
    }
    else{
        if(!isValidEmail(email)){
            alert('Email không hợp lệ, vui lòng nhập lại');
        }
        else{
            const users = {
                username: username,
                password: password,
                email: email
            }

            localStorage.setItem('users', JSON.stringify(users));
            alert('Đăng ký thành công');
            window.location.href = "../products.html";
        }
    }
} )