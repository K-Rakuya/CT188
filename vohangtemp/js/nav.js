
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });
}


document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('active');
    }
});