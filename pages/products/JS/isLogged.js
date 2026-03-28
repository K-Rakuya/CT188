//KIỂM TRA XEM NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP CHƯA
export function isLoggedIn() {
    const user = localStorage.getItem('users');
    if (user == null)  {
        return false;
    }
    return true;
}