
/*IMPORTANT*/

const slides = document.querySelectorAll(".slider__item");

(function(slides) {
  let currentSlide = 0;
  var next = document.getElementById("right");
  var previous = document.getElementById("left");
  const duration = 1000;

  next.addEventListener("click", function(e) {
    e.preventDefault();
    nextSlide();
  });

  previous.addEventListener("click", function(e) {
    e.preventDefault();
    previousSlide();
  });

  function nextSlide() {
    goToSlide(currentSlide + 1);
    setAnimation(currentSlide, "slideInRight", duration);
  }

  function previousSlide() {
    goToSlide(currentSlide - 1);
    setAnimation(currentSlide, "slideInLeft", duration);
  }

  function setAnimation(currentSlide, animation, duration) {
    slides[currentSlide].classList.add(animation);
    setTimeout(() => {
      slides[currentSlide].classList.remove(animation);
    }, duration);
  }

  function goToSlide(n) {
    slides[currentSlide].classList.remove("showing");
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("showing");
  }
})(slides);