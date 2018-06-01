var templateSlide = document.getElementById('template-carousel').innerHTML;

console.log('temp: ' + templateSlide);

Mustache.parse(templateSlide);
var items = '';

for (var i = 0; i < data.length; i++) {
  items += Mustache.render(templateSlide, data[i]);
  console.log(templateSlide);
  console.log(data[i]);
}

var listItems = Mustache.render(templateSlide, {description: items})
var container = document.querySelector('.container');
container.innerHTML = listItems;


var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
  // options
  cellAlign: 'left',
  contain: true,
  hash: true,
  pageDots: false
});

// element argument can be a selector string

// button restart
// var btnRestart = document.querySelector('.btn-restart');
// btnRestart.addEventListener('click', function(){
//   flkty.select(0);
// });

// scroll
// var progressBar = document.querySelector('.progress-bar');

// flkty.on( 'scroll', function( progress ) {
//   progress = Math.max( 0, Math.min( 1, progress ) );
//   progressBar.style.width = progress * 100 + '%';
// });