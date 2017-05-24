
function main() {
  var profileImg = $('.about.img-header');
  var profileImgBottom = profileImg.offset().top + profileImg.height() - 100;

  var collaboFadeIn = false;
  var collabo = $('div.collaborators');
  var collaboTop = collabo.offset().top - 100;
  var collaboBottom = collaboTop + collabo.height();

  collabo.find('li').css('opacity', 0);

  $(window).scroll(function() {
    var docTop = $(window).scrollTop();
    var docBottom = docTop + $(window).height();
    var newPos = docTop / 4.5;

    if (profileImgBottom >= docTop && newPos <= 100) {
      profileImg.css('background-position', '50% ' + newPos +'%');
    }

    if (collaboBottom >= docTop && collaboTop <= docBottom && !collaboFadeIn) {
      setTimeout(function () {
        collabo.find('li').each(function(){
          $(this).fadeTo('slow', 1);
          console.log('fading in!');
        });
      }, 1000);
      collaboFadeIn = true;
    }
  });

  $('.parallax-mouse').mousemove(function(evt){

    var x = ((evt.pageX - $(this).offset().left) / $(this).width()) * 100;
    var y = ((evt.pageY - $(this).offset().top) / $(this).height()) * 100;
    $(this).css('background-position', x+'% ' + y+'%');
  });

}

$('document').ready(main());
