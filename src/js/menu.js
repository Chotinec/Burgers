(function() {
if ($(".menu-acco").length) {
  
  $('.menu-acco__trigger').on("click", e => {
    e.preventDefault();
    const element = e.currentTarget;
    const item = element.parentNode;
    const allItems = $(".menu-acco__item");

    if (!$(item).hasClass("active")) {
      $(allItems).removeClass("active");
      $(item).addClass("active");
    }
  });

  $(".menu-acco__close").on("click", e => {
    e.preventDefault();
    $(".menu-acco__item").removeClass("active");
  });
}
})()

