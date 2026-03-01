const inputUser = document.getElementById("username");
const inputPass = document.getElementById("password");
const btnRegister = document.getElementById("btnRegister");

function register(username, password) {
  if (!username || !password) {
    return 0;
  }

  const user = {
    username: username,
    password: password
  };
  let data = JSON.stringify(user)
  localStorage.setItem("user", data);
  return 1;
}

btnRegister.addEventListener("click", () => {
  const check = register(inputUser.value, inputPass.value);
  if(check){
    alert("Đã đăng ký thành công");
    window.location.href = "index.html";
  }
  else{
    alert("Vui lòng nhập đủ thông tin");
  }
});
