import {isLogged} from "./checkLogin.js";
const user_icon = document.querySelector(".user-icon");
function changeLink(){
    if(isLogged()){
        user_icon.href = ""
    }
    else{
        user_icon.addEventListener("click", ()=>{
            user_icon.href = "";
        })
    }
}
changeLink();


