(function() {
const compoundBtn = $(".burgers__compound-btn");

$(compoundBtn).on("click", e => {
  if (window.innerWidth <= 768) {
    let target = e.target;

    while (target !== e.currentTarget) {
      if (target.classList.contains("burgers__close")) {
        e.preventDefault();
        e.currentTarget.classList.remove("active");
        return;
      } else if (target.classList.contains("burgers__list")) {
        return;
      }

      target = target.parentNode;
    }

    e.currentTarget.classList.toggle("active");
  }
});
})()

