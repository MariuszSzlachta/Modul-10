'use strict';
(function () {

  // Aby nie obawiać się nadpisania zmiennych, cały kod naszego akordeonu zapiszemy w funkcji accordionVanillaJS.
  var accordionVanillaJS = function () {

    // Zaczynamy od znalezienia wszystkich nagłówków w naszym akordeonie. 
    var headers = document.querySelectorAll('#accordion-vanillajs h3');

    // Zdefiniujmy teraz funkcję, którą za chwilę przypiszemy do kliknięcia w każdy z nagłówków. 
    var headerClickCallback = function () {
      // Oparliśmy działanie naszego akordeonu o klasę "active" nadawaną na nagłówek. W takim razie wystarczy, że nadamy tę klasę na kliknięty nagłówek:
      this.classList.add('active');

      // A teraz musimy jeszcze usunąć klasę "active" z wszystkich pozostałych nagłówków. Wykorzystamy do tego pętlę, przechodzącą przez wszystkie nagłówki, zapisane przed chwilą w zmiennej headers.
      for (var i = 0; i < headers.length; i++) {
        // Jeśli dany header ma klasę "active" ORAZ nie jest tym nagłówkiem, który właśnie kliknęliśmy...
        if (headers[i].classList.contains('active') && headers[i] != this) {
          // ... to usuń klasę active.
          headers[i].classList.remove('active');
        }
      }
    };

    // I teraz przypiszemy funkcję headerClickCallback do każdego nagłówka. 

    for (var i = 0; i < headers.length; i++) {
      headers[i].addEventListener('click', headerClickCallback);
    }
  };

  accordionVanillaJS();

  // Teraz Twoja kolej - w poniższej funkcji wpisz kod wykorzystujący jQuery, który sprawi że drugi akordeon będzie działał identycznie do pierwszego. 

  var accordionJQuery = function () {

    $('#accordion-jquery h3').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
      });
  };

  accordionJQuery();


})();