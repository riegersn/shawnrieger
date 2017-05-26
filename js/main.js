
function main() {

  $(window).scroll(function() {
    var scrollTop = window.pageYOffset;
    console.log('scroll-top', scrollTop);
    $parallax.forEach(function($parallaxObj){
      var yPos = ((scrollTop - $parallaxObj.__fgOffset + 100) / $parallaxObj.__speed);
      console.log($parallaxObj.attr('class'), yPos);
      $parallaxObj.css( {backgroundPosition: '50% ' + yPos + 'px'} );
    });
  });

  // fire up the masonry grid
  var $msnry = $('.photo-group').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  });

  // handle load photos btn
  $('.load-photos').click(function(){
    var $photos = getPhotos();
    $photos.hide();
    $msnry.append($photos);
    var scrollOnce = false;
    $photos.imagesLoaded().progress( function( imgLoad, image ) {
      var $item = $( image.img ).parents('.grid-item');
      $item.show();
      $msnry.masonry( 'appended', $item );
      if (!scrollOnce) {
        scrollOnce = true;
        $('html,body').animate({
          scrollTop: $item.offset().top - 75
        }, 1000);
      }
    });
  });

}

// pad number with 0
function quickPad(i) {
  i = i.toString();
  if (i.length == 1) return '0' + i;
  return i;
}

// load the next 6 photos
function getPhotos(){
  var photos = '';
  var cnt = $('.photo-group .grid-item').length;
  for (var i = cnt+1; i < cnt+7; i++) {
    // TODO: stop when no photos are left
    photos += '<div class="grid-item grid-sizer"><img src="img/photography/photography_' + quickPad(i) + '.jpg"></div>';
  }
  return $(photos);
}

// smooth scroll from navigation
$('nav a').click(function(evt){
  evt.preventDefault();
  var id = $(this).attr('href');
  $('html,body').animate({
    scrollTop: $(id).offset().top - 75
  }, 1000);
});

// load parallax elements
var $parallax = [];
$('div.parallax').each(function(){
  var $elm = $(this);
  $elm.__speed = $elm.data('speed');
  $elm.__fgOffset = $elm.offset().top;
  $parallax.push($elm);
});

// go, go, go
$('document').ready(main());
