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
  } else {
    console.log('scrollTo', 'Argument is not proper object.');
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
  var $about = $('#about');
  var $toTopArrow = $('.to-top-arrow');
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

  $(window).resize(function(){
    var sectionOffsetLeft = $about.offset().left;
    if (sectionOffsetLeft < 45)
      $toTopArrow.css({right: '10px', top: '80px'});
    else
      $toTopArrow.css({right: (sectionOffsetLeft-45) + 'px', top: '80px'});
  });

  $(window).scroll(function(){
    if (window.pageYOffset >= 100 && !$toTopArrow.is(':visible'))
      $toTopArrow.toggle();
    else if (window.pageYOffset < 100 && $toTopArrow.is(':visible'))
      $toTopArrow.toggle();
  });

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

  // scroll to top button
  $toTopArrow.click(function(){
    scrollTo($('#main'));
    $(this).hide();
  });

  $(document).on('click','.navbar-collapse.collapse.in a',function() {
    $('#main-nav').collapse('hide');
  });

  // fire this resize event to properly position our scroll to top arrow
  window.dispatchEvent(new Event('resize'));
}

// go, go, go
$('document').ready(main());
