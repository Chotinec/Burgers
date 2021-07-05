(function() {
if ($(".command-acco").length) {
  $('.command-acco__trigger').on("click", e => {
    e.preventDefault();
    const element = e.currentTarget;
    const item = element.parentNode;
    const allItems = $(".command-acco__item");

    if (!$(item).hasClass("command-acco__item--active")) {
      $(allItems).removeClass("command-acco__item--active");
      $(item).addClass("command-acco__item--active");
    } else {
      $(item).removeClass("command-acco__item--active");
    }
  });
}
})()

