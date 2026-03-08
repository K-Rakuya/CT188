import {isLoggedIn} from "./CheckUser/isLogged.js";
if(isLoggedIn()) {
    window.location.href = "../Account/account.html";
}