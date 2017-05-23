
function main() {
  var profileImg = $('.about.img-header');
  var profileImgBottom = profileImg.offset().top + profileImg.height() - 100;

  $(window).scroll(function() {
    var docTop = $(window).scrollTop();
    var newPos = docTop / 4.5;
    if (profileImgBottom >= docTop && newPos <= 100)
      profileImg.css('background-position', '50% ' + newPos +'%');
  });
}

$('document').ready(main());
