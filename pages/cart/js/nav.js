const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileNav.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileNav.classList.remove('active');
        }
    });

    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });
}