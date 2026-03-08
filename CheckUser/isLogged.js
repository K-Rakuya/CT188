const user = localStorage.getItem('user');
function isLoggedIn() {
    if (user == null)  {
        return false;
    }
    return true;
}