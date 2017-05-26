// max number of photographs available
var numberOfPhotographs = 20;

/**
 * photography lightbox
 */
var $lightbox = $('#lightbox');
var $lightboxImg = $('#lightbox img');

$('.photo-group img').click(function(){
  var src = $(this).attr('src');
  $lightboxImg.attr('src', src);
  $lightbox.show(0, function(){
    $lightbox.css({opacity: 1});
  });
});

$lightbox.click(function(){
  $lightbox.css({opacity: 0});
  setTimeout(function(){
    $lightbox.hide();
  }, 250);
});

// scrollTo - little helper function
var scrollTo = function($object) {
  $('html,body').animate({
    scrollTop: $object.offset().top - 80
  }, 1000);
};

function main() {

  // monitor scroll for parallax
  $(window).scroll(function() {
    var scrollTop = window.pageYOffset;
    $parallax.forEach(function($parallaxObj){
      var yPos = ((scrollTop - $parallaxObj.__fgOffset + 100) / $parallaxObj.__speed);
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
      $(image.img).click(function(){
        var src = $(this).attr('src');
        $lightboxImg.attr('src', src);
        $lightbox.show(0, function(){
          $lightbox.css({opacity: 1});
        });
      });
      $item.show();
      $msnry.masonry( 'appended', $item );
      if (!scrollOnce) {
        scrollOnce = true;
        scrollTo($item);
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
  for (var i = cnt+1; i < cnt+7 && i < (numberOfPhotographs+1); i++) {
    // TODO: stop when no photos are left
    photos += '<div class="grid-item grid-sizer"><img src="img/photography/photography_' + quickPad(i) + '.jpg"></div>';
  }
  return $(photos);
}

// smooth scroll from navigation
$('nav button').click(function(evt){
  evt.preventDefault();
  var $section = $('#' + $(this).data('section'));
  scrollTo($section);
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
