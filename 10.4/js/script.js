// maps
window.initMap = function () {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: slides[0].coords
  });
  var markers = [];
  var currentSlide;
  // add markers
  for (var i = 0; i < slides.length; i++) {
    markers[i] = new google.maps.Marker({
      position: slides[i].coords,
      map: map
    });
  }

  markers[0].addListener('click', function(){
    flkty.select(0);
  });
  markers[1].addListener('click', function(){
    flkty.select(1);
  });
  markers[2].addListener('click', function(){
    flkty.select(2);
  });
  //etap 2
  // wersja nie płynna działa
  flkty.on('change', function(index){
    map.panTo(markers[index].position);
    map.setZoom(16);
  })
  // wersja płynna zawiesza przeglądarke
  // flkty.on('change', function(index){
  //   console.log(markers[index]);
  //   smoothPanAndZoom(map, 16, markers[index].position);
  // })
}

// mustache

var templateSlide = document.getElementById('template-carousel').innerHTML;
var carousel = document.querySelector('.main-carousel');

Mustache.parse(templateSlide);
var renderedTemplates = '';

for (var i = 0; i < data.length; i++) {
  renderedTemplates += Mustache.render(templateSlide, data[i]);
}
carousel.innerHTML = renderedTemplates;


// flickity
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
  // options
  cellAlign: 'left',
  contain: true,
  hash: true,
  pageDots: false
});

// flkty();

// button restart
var btnRestart = document.querySelector('.btn-restart');
btnRestart.addEventListener('click', function () {
  flkty.select(0);
});

// scroll
var progressBar = document.querySelector('.progress-bar');

flkty.on('scroll', function (progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBar.style.width = progress * 100 + '%';
});



// przesówanie zooma do kolejnego zadania

var smoothPanAndZoom = function (map, zoom, coords) {
  var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
  jumpZoom = Math.min(jumpZoom, zoom - 1);
  jumpZoom = Math.max(jumpZoom, 3);

  smoothZoom(map, jumpZoom, function () {
    smoothPan(map, coords, function () {
      smoothZoom(map, zoom);
    });
  });
};

var smoothZoom = function (map, zoom, callback) {
  var startingZoom = map.getZoom();
  var steps = Math.abs(startingZoom - zoom);

  if (!steps) {
    if (callback) {
      callback();
    }
    return;
  }

  var stepChange = -(startingZoom - zoom) / steps;

  var i = 0;
  var timer = window.setInterval(function () {
    if (++i >= steps) {
      window.clearInterval(timer);
      if (callback) {
        callback();
      }
    }
    map.setZoom(Math.round(startingZoom + stepChange * i));
  }, 80);
};

var smoothPan = function (map, coords, callback) {
  var mapCenter = map.getCenter();
  coords = new google.maps.LatLng(coords);

  var steps = 12;
  var panStep = {
    lat: (coords.lat() - mapCenter.lat()) / steps,
    lng: (coords.lng() - mapCenter.lng()) / steps
  };

  var i = 0;
  var timer = window.setInterval(function () {
    if (++i >= steps) {
      window.clearInterval(timer);
      if (callback) callback();
    }
    map.panTo({
      lat: mapCenter.lat() + panStep.lat * i,
      lng: mapCenter.lng() + panStep.lng * i
    });
  }, 1000 / 30);
};