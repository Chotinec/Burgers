let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '100%',
    videoId: 'zmg_jOwa9Fc',
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  const playerButton = $('.player__start');
  switch(event.data) {
    case 1:
      $('.player__wrapper').addClass('active');
      playerButton.addClass('paused');
      break;
    case 2:
      playerButton.removeClass('paused');
      break;
  }

}

function onPlayerReady() {
  const durationInSeconds = player.getDuration();

  const volume = player.setVolume(50);
  $('.player__volume-button').css({
    left: '50%'
  });

  let interval;

  clearInterval(interval);

  interval = setInterval(() =>{
    const compleatedInSeconds = player.getCurrentTime();
    const parcent = (compleatedInSeconds / durationInSeconds) * 100;
    
    $('.player__playback-button').css({
      left: `${parcent}%`
    });

    // $('.player__duration-completed').text(formatTime(compleatedInSeconds));
  }, 1000);

  $('.player__duration-estimate').text(formatTime(durationInSeconds));
}

function formatTime(time) {
  const roundTime = Math.round(time);

  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;
  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return minutes + ":" + formatedSeconds;
}

$('.player__start').on('click', e => {
  const btn = $('.player__start');

  if (btn.hasClass("paused")) {
    player.pauseVideo();
    // btn.removeClass("paused");
  } else {
    player.playVideo();
    // btn.addClass("paused");

    console.log(btn.hasClass("paused"));
  }
});

$('.player__playback').on('click', e => {
  e.preventDefault();

  const bar = $(e.currentTarget);
  const newButtonPosition = e.pageX - bar.offset().left;
  const clickedParcent = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() /100) * clickedParcent;
  
  $('.player__playback-button').css({
    left: `${clickedParcent}%`
  });

  player.seekTo(newPlayerTime);
});

$('.player__splash').on('click', e => {
  player.playVideo();
  // $('.player__wrapper').addClass('active');
});

$('.player__volume-mute').on('click', e => {
  e.preventDefault();

  const bar = $(e.currentTarget);
  const newVolumePosition = e.pageX - bar.offset().left;
  const clickedParcent = (newVolumePosition / bar.width()) * 100;
  // const newVolumeRate = (player.getDuration() /100) * clickedParcent;

  $('.player__volume-button').css({
    left: `${clickedParcent}%`
  });

  player.setVolume(Math.round(clickedParcent));
});

$('.player__volume-btn').on('click', e => {
  if (player.isMuted()) {
    player.unMute();
  } else {
    player.mute();
  }
  
  $('.player__volume-icon').toggleClass('off');
});
