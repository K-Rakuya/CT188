function readMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Xem thêm";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Thu gọn";
    moreText.style.display = "inline";
  }
}

/* --- Slider Logic --- */
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let index = 0;

function showSlide(i) {
  if (slides.length === 0) return;

  // Xóa class active cũ
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  // Thêm class active mới
  slides[i].classList.add("active");
  if (dots[i]) dots[i].classList.add("active");
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

// Gán sự kiện click cho nút
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn) nextBtn.onclick = nextSlide;
if (prevBtn) prevBtn.onclick = prevSlide;

// Tự động chạy slide sau mỗi 3 giây
setInterval(() => {
  nextSlide();
}, 3000);
