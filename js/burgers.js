  $('.header-menu-link').on('click', function (e) {
    e.preventDefault();

    _toggleClass();
  });

  $('.fullscreen-menu__link').on("click", function(e) {
    e.preventDefault();
    const scroll_el = $(this).attr("href");
  
    if (scroll_el !== "#") {
      $("html").animate({ scrollTop: $(scroll_el).offset().top }, 600, () => {
        _toggleClass();
      });
    }
  });


const _toggleClass = () => {
  $('.fullscreen-menu').toggleClass('fullscreen-menu--active');
  $('.animated-icon').toggleClass('animated-icon--open');
  $('body').toggleClass('hidden');
};