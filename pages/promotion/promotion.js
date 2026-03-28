// 1. Hàm mở Modal
const openPromo = (title, imgSrc, desc) => {
    const modal = document.getElementById('promoModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalDesc').textContent = desc;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

// 2. Hàm đóng Modal
const closePromo = () => {
    document.getElementById('promoModal').style.display = 'none';
    document.body.style.overflow = 'auto';
};

// 3. Lọc khuyến mãi
const filterPromo = (category) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        if (category === 'all' || cardType === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// 4. Quà tặng ngẫu nhiên 
const giveRandomGift = () => {
    const gifts = [
        { name: "GIẢM 50% TRÀ TRÁI CÂY", info: "Mã: MIXI50. Áp dụng cho các loại trà size L.", img: "images/tratraicay.jpg" },
        { name: "FREE TOPPING FREEZE", info: "Tặng trân châu trắng cho đơn hàng Freeze bất kỳ.", img: "images/freeze.png" },
        { name: "VOUCHER 0 ĐỒNG", info: "Tặng 01 ly Cafe Đen cho khách hàng mới.", img: "images/cfden.jpg" }
    ];

    const random = Math.floor(Math.random() * gifts.length);
    const item = gifts[random];

    openPromo(item.name, item.img, item.info);
};

// 5. Gửi form
document.getElementById('feedbackForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã góp ý! Mixi Coffee sẽ phản hồi sớm nhất.');
    e.target.reset();
});

window.onclick = (event) => {
    const modal = document.getElementById('promoModal');
    if (event.target === modal) closePromo();
};