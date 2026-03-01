export function isLogged(){
    const user = localStorage.getItem("user");
    return user != null;
}