const sections = $('.section');
const display = $('.maincontent');

let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const  switchActiveClassPoints = pointIndex => {
  $('.points__item')
  .eq(pointIndex)
  .addClass('active')
  .siblings()
  .removeClass('active');
};

const performTransition = sectionEqNum => {
  if (inscroll) return;

    //const transitionDuration =0;
    //const endOfDuration = 300;

    inscroll = true;

    const position = sectionEqNum * -100 + "%";
  
    sections
    .eq(sectionEqNum)
    .addClass("active-section")
    .siblings()
    .removeClass("active-section");

    display.css({
      transform: `translateY(${position})`
    });

    setTimeout(() => {
      switchActiveClassPoints(sectionEqNum)
      inscroll = false;
    }, 1000 + 300);
};

const scrollToSection = direction => {
  const activeSection = sections.filter(".active-section");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$('.wrapper').on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  console.log('wheel event');
  
  if (deltaY > 0) {
    scrollToSection("next");
  }

  if (deltaY < 0) {
    scrollToSection("prev");
  }

});

$('.wrapper').on('touchmove', e => {
  e.preventDefault();
});

$(document).on("keydown", e => {
  switch(e.keyCode) {
    case 38:
      scrollToSection("prev");
      break;
    case 40: 
      scrollToSection("next");
      break;
  }
});

$("[data-scroll-to]").on('click', e => {
  e.preventDefault();
  const target = $(e.currentTarget).attr('data-scroll-to');

  performTransition(target);
});

$('.arrow').on('click', e => {
  e.preventDefault();
  scrollToSection("next");
});

$('.header__order-btn').on('click', e => {
  e.preventDefault();
  
  performTransition(7);
});

if (isMobile) {
  $(window).swipe({
  swipe: function(event, direction) {
    const nextOrPrev = direction === "up" ? "next" : "prev";
    scrollToSection(nextOrPrev);
  }
});
}

