
const menuBtn = document.querySelector('.mobile-menu-btn'); // Nút bấm mở menu 
const mobileNav = document.getElementById('mobileNav');     // Thanh menu điều hướng

// KIỂM TRA TỒN TẠI TRƯỚC KHI CHẠY (Tránh lỗi nếu trang không có menu) ---
if (menuBtn && mobileNav) {
    
    // Sự kiện khi click vào nút Menu Mobile
    menuBtn.addEventListener('click', (e) => {
        // dòng này ngăn chặn sự kiện click sẽ truyền lên document và kích hoạt hàm đóng menu ngay lập tức
        e.preventDefault(); 
        
        // Thêm hoặc xóa class 'active' để hiển thị/ẩn menu
        mobileNav.classList.toggle('active');
    });

    // Sự kiện khi click vào bất kỳ đâu trên trang (document)
    document.addEventListener('click', (e) => {
        //Nếu vị trí click KHÔNG nằm trong menu VÀ KHÔNG nằm trên nút bấm menu
        if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
            // Thì tiến hành đóng menu 
            mobileNav.classList.remove('active');
        }
    });

    // XỬ LÝ KHI CLICK VÀO CÁC LINK TRONG MENU
    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Khi người dùng chọn một trang/link, tự động đóng menu cho thoáng màn hình
            mobileNav.classList.remove('active');
        });
    });
}