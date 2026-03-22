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
