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
  $('html,body').animate({
    scrollTop: $object.offset().top - 80
  }, 1000);
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

  // monitor scroll for parallax
  $(window).scroll(function() {
    var scrollTop = window.pageYOffset;
    $parallax.forEach(function($parallaxObj){
      var yPos = Math.floor(((scrollTop - $parallaxObj.__fgOffset + 100) / $parallaxObj.__speed) * -1);
      $parallaxObj.stop().css( {backgroundPosition: '50% ' + yPos + 'px'} );
    });
  });

  // get our initial set of photos
  var $msnry = $('.photo-group');
  var $photos = getPhotos();
  $msnry.append($photos);
  $photos.find('img').click(function(){
    var src = $(this).data('large');
    console.log(src);
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
    var $photos = getPhotos();

    if (photoBin.photos.length < 1) // eslint-disable-line
      $(this).fadeOut();

    $photos.hide();
    $msnry.append($photos);
    var scrollOnce = false;
    $photos.imagesLoaded().progress( function( imgLoad, image ) {
      var $item = $( image.img ).parents('.grid-item');
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
  });

  var $intros = $('#intro-content div');
  $intros.css('right', (($(window).width() / 2) + 60) + 'px');
  $intros.each(function(index){
    $(this).delay(800*(index+1)).fadeIn(400);
  });
  setTimeout(function(){
    $intros.each(function(index){
      $(this).delay(130*(index+1)).animate({right: -2000, opacity: 0});
    });
  }, 5200);


}

// go, go, go
$('document').ready(main());
