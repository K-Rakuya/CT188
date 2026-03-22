const passwordInput = document.querySelector('#password');
const togglePassword = document.querySelector('#togglePassword');

// --- CHỨC NĂNG 1: Ẩn/Hiện mật khẩu ---
if (togglePassword) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-lock');
    });
}