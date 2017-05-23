
function main() {
  $(window).scroll(function() {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $('.me-background').offset().top;

    if ((elemTop <= docViewBottom) && (elemTop >= docViewTop)) {
      var imgPos = docViewTop / 2;
      $('.me-background').css('background-position', '50% ' + imgPos +'%');
    }
  });
}

$('document').ready(main());
