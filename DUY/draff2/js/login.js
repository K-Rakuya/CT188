const passwordInput = document.querySelector('#password');
const togglePassword = document.querySelector('#togglePassword');

togglePassword.addEventListener('click' , ()=>{
   const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    
    // Thay đổi thuộc tính type
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-lock');
});