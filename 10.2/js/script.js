var templateSlide = document.getElementById('template-carousel').innerHTML;
var carousel = document.querySelector('.main-carousel');

Mustache.parse(templateSlide);

var items = [];

for (var i = 0; i < data.length; i++) {
  items.push(Mustache.render(templateSlide, data[i]));
    carousel.innerHTML += items[i];
}
// flickity
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
  // options
  cellAlign: 'left',
  contain: true,
  hash: true,
  pageDots: false
});
