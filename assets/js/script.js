// Element Selectors
const navMenuBtn = document.querySelector(".mainNav__menuBtn");

// Menu button
navMenuBtn.onclick = () => {
    navMenuBtn.classList.toggle("active");
}