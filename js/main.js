// Burger Menu
let burgerMenu = document.querySelector(".burger-menu");
let navMobile = document.querySelector("nav");

burgerMenu.onclick = function () {
    this.classList.toggle("active");
    navMobile.classList.toggle("active");
};
