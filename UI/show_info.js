const user = localStorage.getItem("user");
let content = JSON.parse(user).username;
const element = document.querySelector(".name");
element.textContent = content;

const btn_log_out = document.querySelector("#log_out");
btn_log_out.addEventListener("click" , ()=>{
    localStorage.clear();
} )