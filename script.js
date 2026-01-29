const homeSearchButton = document.getElementById("home-search-button");
const homeSearchBox = document.getElementById("home-search-box");
const navRight = document.querySelector(".nav-right-elements");
const homeBanner = document.querySelector(".home-banner-wrap");

homeSearchButton.addEventListener("click", () => {
    homeSearchBox.classList.add("show");
    homeSearchBox.focus();
    navRight.classList.add("expand");
});

homeSearchBox.addEventListener("blur", () => {
    homeSearchBox.classList.remove("show");
    navRight.classList.remove("expand");
})

let x = 0, y = 0;
let currentX = 0, currentY = 0;

document.addEventListener("mousemove", (e) => {
    x = (e.clientX / window.innerWidth - 0.5) * 10;
    y = (e.clientY / window.innerHeight - 0.5) * 10;
})

function animate() {
    currentX += (x - currentX) * 0.01;
    currentY += (y - currentY) * 0.01;
    homeBanner.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
    requestAnimationFrame(animate);
}

animate();