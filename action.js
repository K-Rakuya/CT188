let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let index = 0;

function showSlide(i) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

function nextSlide() {
  index++;
  if (index >= slides.length) index = 0;
  showSlide(index);
}

function prevSlide() {
  index--;
  if (index < 0) index = slides.length - 1;
  showSlide(index);
}

document.querySelector(".next").onclick = nextSlide;
document.querySelector(".prev").onclick = prevSlide;

let selectedStars = 0;

// chọn sao
const stars = document.querySelectorAll("#starSelect span");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    selectedStars = parseInt(star.getAttribute("data-value"));

    stars.forEach((s) => s.classList.remove("active"));
    for (let i = 0; i < selectedStars; i++) {
      stars[i].classList.add("active");
    }
  });
});

// thêm review
function addReview() {
  const name = document.getElementById("name").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (!name || !comment || selectedStars === 0) {
    alert("Vui lòng nhập đầy đủ!");
    return;
  }

  const reviewList = document.getElementById("reviewList");

  const review = document.createElement("div");
  review.classList.add("review");

  review.innerHTML = `
    <div>${"⭐".repeat(selectedStars)}</div>
    <p>"${comment}"</p>
    <small>- ${name}</small>
  `;

  reviewList.prepend(review);

  // reset form
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
  selectedStars = 0;
  stars.forEach((s) => s.classList.remove("active"));
}

///nav
// Avatar or Login Btn

const LoginBox = document.getElementById("login-container");
const Card = document.getElementById("button-card");
const Avt = document.getElementById("avatar");
const login = document.getElementById("login");
const register = document.getElementById("register");

window.auth = (() => {
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
    },
  };
})();

[login, register].forEach((btn) => {
  btn.addEventListener("click", (e) => {
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
    searchBtn.style.pointerEvents;
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
