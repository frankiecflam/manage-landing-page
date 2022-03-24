// Element Selectors
const navMenuBtn = document.querySelector(".mainNav__menuBtn");
const testiomonialsSlider = document.querySelector(".testimonials__slider");
const testimonialsItems = document.querySelectorAll(".testimonials__item");
const testiomonialsSliderController = document.querySelector(
  ".testimonials__slider-btnController"
);

// Menu button
navMenuBtn.onclick = () => {
  navMenuBtn.classList.toggle("active");
};

function testimonialsSliderInit() {
  // Testiomonials' slider
  testimonialsItems.forEach((item, i) => {
    item.style.transform = `translateX(${i * 100}vw)`;
  });

  // Testimonials' controller buttons
  for (let i = 0; i < testimonialsItems.length; i++) {
    testiomonialsSliderController.insertAdjacentHTML(
      "beforeend",
      `<a class="btn testimonials__slider-btn" data-slide="${i}"></a>`
    );
  }
  // By default, first dot is highlighted
  document
    .querySelector(`.testimonials__slider-btn[data-slide="0"]`)
    .classList.add("active");
}
testimonialsSliderInit();

// SlideTo
let currentSlide = 0;
const minSlide = 0;
const maxSlide = testimonialsItems.length;

function slideTo(slide) {
  testimonialsItems.forEach((item, i) => {
    item.style.transform = `translateX(${(i - slide) * 100}vw)`;
  });

  const testimonialsSliderBtns = document.querySelectorAll(".testimonials__slider-btn");
  testimonialsSliderBtns.forEach((item, i) => {
      +slide === i ? item.classList.add("active"): item.classList.remove("active");
  })

  // Update current slidePointer
  currentSlide = +slide;
}

// Upon a click on testimonials' slider buttons
testiomonialsSliderController.onclick = function (e) {
  if (!e.target.classList.contains("testimonials__slider-btn")) return;

  slideTo(e.target.dataset.slide);
};

// Automatica Sliding after nth sec
setInterval(() => {
    // check if nextslide is out of range
    if (currentSlide === maxSlide - 1) {
        slideTo(minSlide);
        currentSlide = minSlide;
    }
    else {
        const nextslide = currentSlide + 1;
        slideTo(nextslide);
    }
}, 5000);