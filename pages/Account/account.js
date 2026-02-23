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


let x = 0, y = 0;
let currentX = 0, currentY = 0;

const avatar = document.getElementById("avatar-container");

document.addEventListener("mousemove", (e) => {
    x = (e.clientX / window.innerWidth - 0.5) * 20;
    y = (e.clientY / window.innerHeight - 0.5) * 20;
})

function animate() {
    currentX += (x - currentX) * 0.01;
    currentY += (y - currentY) * 0.01;
    avatar.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
    requestAnimationFrame(animate);
}
animate();