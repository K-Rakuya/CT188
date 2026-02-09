// Avatar or Login Btn

const LoginBox = document.getElementById("login-container");
const Card = document.getElementById("button-card");
const Avt = document.getElementById("avatar");
const login = document.getElementById("login");
const register = document.getElementById("register");

const auth = (() => {
    let isLoged = 0;

    function updateUI() {
        setLoggedUI(isLoged);
    }

    return {
        login() {
            isLoged = 1;
            updateUI();
        },
        isLoged() {
            return isLoged;
        }
    };
})();

[login, register].forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        auth.login();
    });
});



function setLoggedUI(isLoged) {
    if (isLoged) {
        LoginBox.classList.add("hidden");
        Card.classList.remove("hidden");
        Avt.classList.remove("hidden");
    } else {
        Avt.classList.add("hidden");
        LoginBox.classList.remove("hidden");
        Card.classList.add("hidden");
    }
}

// Search 
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchForm = document.getElementById("searchForm");

let clickingSearchBtn = false;

searchBtn.addEventListener("mousedown", () => {
    clickingSearchBtn = true;
});

searchBtn.addEventListener("click", (e) => {
    if (!searchBox.value.trim() || !searchBox.classList.contains("show")) {
        e.preventDefault();
        searchForm.classList.add("expand");
        searchBox.classList.add("show");
        searchBox.focus();
        searchBtn.style.pointerEvents
    }
    clickingSearchBtn = false;
});

searchBox.addEventListener("blur", () => {
    if (clickingSearchBtn) return;

    searchBox.classList.remove("show");

    setTimeout(() => {
        searchForm.classList.remove("expand");
    }, 200);
});