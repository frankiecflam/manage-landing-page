// Element Selectors
const navMenuBtn = document.querySelector(".mainNav__menuBtn");
const testiomonialsSlider = document.querySelector(".testimonials__slider");
const testimonialsItems = document.querySelectorAll(".testimonials__item");
const testiomonialsSliderController = document.querySelector(
  ".testimonials__slider-btnController"
);
const newsletterForm = document.querySelector(".secNav__newsletter-form");
const newsletterEmailInput = document.querySelector(
  ".secNav__newsletter-email"
);
const newsletterInputGroup = document.querySelector(
  ".secNav__newsletter-inputGroup"
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

  const testimonialsSliderBtns = document.querySelectorAll(
    ".testimonials__slider-btn"
  );
  testimonialsSliderBtns.forEach((item, i) => {
    +slide === i
      ? item.classList.add("active")
      : item.classList.remove("active");
  });

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
  } else {
    const nextslide = currentSlide + 1;
    slideTo(nextslide);
  }
}, 5000);

// Clear validity
function clearInputValidity(input) {
  input.classList.remove("valid");
  input.classList.remove("invalid");
}

function clearFormValidity(form) {
  form.classList.remove("was-validated-success");
  form.classList.remove("was-validated-unsuccess");
}

function checkInputValidity(input) {
  const inputGroup = input.closest(".secNav__newsletter-inputGroup");
  input.checkValidity()
    ? inputGroup.classList.add("valid")
    : inputGroup.classList.add("invalid");
}

function checkFormValidity(form) {
  form.checkValidity()
    ? form.classList.add("was-validated-success")
    : form.classList.add("was-validated-unsuccess");
}

// Form validation
newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Check form validity
  checkFormValidity(newsletterForm);

  // Clear input validity
  clearInputValidity(newsletterInputGroup);

  newsletterEmailInput.value = "";

  // Dismiss form feedback after n seconds
  setTimeout(() => {
    clearFormValidity(newsletterForm);
  }, 8000);

});

// Clear any previous form validity if there is input coming in
newsletterEmailInput.addEventListener("focus", function () {
  clearFormValidity(newsletterForm);
});

// Inline form validation when the input is off focus
newsletterEmailInput.addEventListener("blur", function () {
  clearInputValidity(newsletterInputGroup);

  // No check necessary if input is left blank
  if (!newsletterEmailInput.value.length > 0) return;

  // show feedback depending on the input's validity
  clearInputValidity(newsletterInputGroup);

  // Check input validity
  checkInputValidity(newsletterEmailInput);
});
