const sliderList = document.querySelector(".slider__list");
let sliderItems = sliderList.querySelectorAll(".slider__item");

const prevBtn = document.querySelector(".burgers__arrow-left");
const nextBtn = document.querySelector(".burgers__arrow-right");

let counter = 1; // Выставляем начальный transform: translate..

animateSlide();

["first", "last"].forEach(side => createClone(side)); // Создаем клоны в начале и конце списка
sliderItems = sliderList.querySelectorAll(".slider__item");

function createClone(side) {
  let cloneElement = document.createElement("li");

  cloneElement.classList.add("slider__item");
  cloneElement.id = `${side}Clone`;

  if (side === "first") {
    cloneElement.innerHTML = sliderItems[sliderItems.length - 1].innerHTML;
    sliderList.insertBefore(cloneElement, sliderList.firstChild);
  }

  if (side === "last") {
    cloneElement.innerHTML = sliderItems[0].innerHTML;
    sliderList.appendChild(cloneElement);
  }

  cloneElement = null; // Чтобы почистить
}

function animateSlide(transition = false) { // Если передает "transition", то также на элемент вешается transition
sliderList.style.transform = "translateX(" + -100 * counter + "%)";
transition
  ? (sliderList.style.transition = "transform 1s ease-in-out")
  : (sliderList.style.transition = "none");
}

prevBtn.addEventListener("click", e => {
  e.preventDefault();
  if (counter <= 0) return;
  counter--;
  animateSlide("transition");
});

nextBtn.addEventListener("click", e => {
  e.preventDefault();
  if (counter >= sliderItems.length - 1) return;
  counter++;
  animateSlide("transition");
});

sliderList.addEventListener("transitionend", () => { // Событие, которое происходит после срабатывания transition
  if (sliderItems[counter].id === "lastClone") {
    counter = sliderItems.length - counter; // Обновляетя counter и происходит сдвиг при помощи transform без анимации(незаметно)
    animateSlide();
  }

  if (sliderItems[counter].id === "firstClone") {
    counter = sliderItems.length - 2;
    animateSlide();
  }
});

// touch - на мобильных устройствах есть событий при нажатии пальцем на экран, мы их обрабатыванием, и делаем прокрутку слайдов
let touch = 0;

sliderList.addEventListener("touchstart", e => {
  let touchObj = e.changedTouches[0];
  touch = touchObj.clientX;
});

sliderList.addEventListener("touchend", e => {
  let touchObj = e.changedTouches[0];

  if (touch + 30 < touchObj.clientX) animateSlide(counter--);
  if (touch - 30 > touchObj.clientX) animateSlide(counter++);
});