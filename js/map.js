ymaps.ready(init);

var placemarks = [
  {
    latitude: 59.97,
    longitude: 30.31,
    hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
    balloonContent: [
      '<div class="map__balloon">',
      '<img class="map__burger-img src="./images/burgers-slider/dark_burger.png">',
      'Тhe most tasty burgers only us! Welcome!',
      '</div>'
    ]
  },
  {
    latitude: 59.94,
    longitude: 30.25,
    hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
    balloonContent: [
      '<div class="map__balloon">',
      '<img class="map__burger-img src="./images/burgers-slider/dark_burger.png">',
      'Тhe most tasty burgers only us! Welcome!',
      '</div>'
    ]
  },
  {
    latitude: 59.93,
    longitude: 30.34,
    hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
    balloonContent: [
      '<div class="map__balloon">',
      '<img class="map__burger-img src="./images/burgers-slider/dark_burger.png">',
      'Тhe most tasty burgers only us! Welcome!',
      '</div>'
    ]
  }
],
geoObjects = [];

function init(){
  var myMap = new ymaps.Map("map", {
    center: [59.94, 30.32],
    zoom: 12,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  for (var i = 0; i < placemarks.length; i++) {
    geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
    {
        hintContent: placemarks[i].hintContent,
        balloonContent: placemarks[i].balloonContent.join('')
    },
    {
        iconLayout: 'default#image',
        iconImageHref: '../images/icons/map-marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57],
        iconImageClipRect: [[415, 0], [461, 57]]
    });
}

var clusterer = new ymaps.Clusterer({
  clusterIcons: [
      {
          href: '../images/burgers-slider/dark_burger.png',
          size: [50, 50],
          offset: [-50, -50]
      }
  ],
  clusterIconContentLayout: null
});

myMap.geoObjects.add(clusterer);
clusterer.add(geoObjects);

}