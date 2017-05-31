/*!
 * Licensed under the MIT license
 * by Shawn Rieger / shawnrieger.com
 */

/**
 * Simple helper method that scrolls the window to the given object
 * @method scrollTo
 * @param  {jQuery} $object Object to scroll to
 */
function scrollTo($object) {
  if (typeof $object === 'object' && typeof $object.offset === 'function') {
    $('html,body').animate({
      scrollTop: $object.offset().top - 80
    }, 1500);
  }
}

/**
 * Queues up random photos from the our photoBin
 * @method getPhotos
 * @param  {integer}  numberOfPhotos Number of photos to return, default 6
 * @return {jQuery}                  jQuery object of photos
 */
function getPhotos(numberOfPhotos){
  numberOfPhotos = numberOfPhotos || 6;
  var photos = '';
  var photoGroup = photoBin.getPhotos(numberOfPhotos); // eslint-disable-line
  for (var i = 0; i < photoGroup.items.length; i++) {
    photos += '<div class="grid-item grid-sizer"><img src="'+photoGroup.items[i].small+'" data-large="'+photoGroup.items[i].large+'"></div>';
  }
  return $(photos);
}

/**
 * Our main script...
 * @method main
 */
function main() {
  var $lightbox = $('#lightbox');
  var $lightboxImg = $('#lightbox img');
  $lightbox.click(function(){
    $lightbox.css({opacity: 0});
    setTimeout(function(){
      $lightbox.hide();
    }, 250);
  });

  // smooth scroll from navigation
  $('nav a').click(function(evt){
    evt.preventDefault();
    var $section = $($(this).attr('href'));
    scrollTo($section);
  });

  // load parallax elements
  // var $parallax = [];
  // $('div.parallax').each(function(){
  //   var $elm = $(this);
  //   $elm.__speed = $elm.data('speed');
  //   $elm.__fgOffset = $elm.offset().top;
  //   $parallax.push($elm);
  // });

  // monitor scroll for parallax
  // $(window).scroll(function() {
  //   if ($(window).width() > 752) {
  //     var scrollTop = window.pageYOffset;
  //     $parallax.forEach(function($parallaxObj){
  //       var yPos = Math.floor(((scrollTop - $parallaxObj.__fgOffset + 50) / $parallaxObj.__speed) * -1);
  //       $parallaxObj.stop().css( {backgroundPosition: '50% ' + yPos + 'px'} );
  //     });
  //   } else {
  //     $('div.parallax').css({backgroundPosition: 'center center'});
  //   }
  // });

  // get our initial set of photos
  var $msnry = $('.photo-group');
  var $photos = getPhotos();
  $msnry.append($photos);
  $photos.find('img').click(function(){
    var src = $(this).data('large');
    $lightboxImg.attr('src', src);
    $lightbox.show(0, function(){
      $lightbox.css({opacity: 1});
    });
  });

  $photos.imagesLoaded().always( function() {
    // fire up the masonry grid
    $msnry.masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  });

  //handle load photos btn
  $('.load-photos').click(function(){
    var scrollOnce = false;
    var $photos = getPhotos();

    $photos.hide();
    $msnry.append($photos);

    $photos.imagesLoaded().progress( function( imgLoad, image ) {
      var $item = $(image.img).parents('.grid-item');

      $(image.img).click(function(){
        var src = $(this).data('large');
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

    // hide the button if we have no more images left
    if (photoBin.photos.length < 1) // eslint-disable-line
      $(this).fadeOut();
  });

  $(document).on('click','.navbar-collapse.collapse.in a',function() {
    $('#main-nav').collapse('hide');
  });

}

// go, go, go
$('document').ready(main());
