export function isLoggedIn() {
    const user = localStorage.getItem('user');
    if (user == null)  {
        return false;
    }
    return true;
}