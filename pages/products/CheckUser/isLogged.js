export function isLoggedIn() {
    const user = localStorage.getItem('loggedInId');
    if (user == null)  {
        return false;
    }
    return true;
}