
const button_register = document.querySelector('.btn-primary');

button_register.addEventListener('click',(e)=>{
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const confirm_password = document.querySelector('#confirm_password').value;
    if(username === '' || password === '' || confirm_password === ''){
        alert('Vui lòng nhập đầy đủ thông tin');
    }
    else if(password !== confirm_password){
        alert('Mật khẩu xác nhận không khớp');
    }
    else{
        const user = {
            username: username,
            password: password
        }

        localStorage.setItem('user', JSON.stringify(user));
        alert('Đăng ký thành công');
        window.location.href = "../index.html";
    }
} )