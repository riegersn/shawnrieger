/*
 * Licensed under the MIT license
 * by Shawn Rieger / shawnrieger.com
 */


// checkif we're at home, and if we got here with a hash
var atHome = (window.location.pathname === '/');
var hasHash = (window.location.hash !== '');

// when we want to temporarily prevent scroll spying, we'll start off off ;p
var scrollSpy = false;

/**
 * scrollToObject
 * Simple helper method that scrolls the window to the given object
 */
function scrollToObject($object, options) {
  // set our default options
  var defaults = {
    offset: 0,
    callback: null
  };

  // extend defaults with options argument
  defaults = $.extend(defaults, options);

  // make sure our $object is a valid object
  if (typeof $object === 'object' && typeof $object.offset === 'function') {

    // finish any running animations before we start a new one
    $('html,body').finish().animate({
      scrollTop: $object.offset().top - defaults.offset
    }, 1500, function(){
      // if our callback is valid, execute it
      if (typeof defaults.callback === 'function')
        defaults.callback();
    });

  } else {
    // print to the console if we don't get a valid object
    console.log('scrollTo', 'Argument is not proper object.');
  }
}


/**
 * getPhotos
 * Queues up random photos from the our photoBin
 */
function getPhotos(numberOfPhotos){
  // number of photos defaults to 6
  numberOfPhotos = numberOfPhotos || 6;
  // get photos from the photoBin
  var photos = '';
  var photoGroup = photoBin.getPhotos(numberOfPhotos); // eslint-disable-line
  // itterate through our list of photos, append the html string to our photos var
  for (var i = 0; i < photoGroup.items.length; i++) {
    photos += '<div class="grid-item grid-sizer"><img src="'+photoGroup.items[i].small+'" data-large="'+photoGroup.items[i].large+'"></div>';
  }
  // return compile photos var as a jQuery object
  return $(photos);
}


/**
 * getSectionOffsets
 * Get the offset top position for each section tag
 */
function getSectionOffsets() {
  var locations = [];
  // itterate over each section
  $('section').each(function(){
    var $sec = $(this);
    // push section ID and top position into locations array
    locations.push({ id: $sec.attr('id'), pos: Math.floor($sec.offset().top) });
  });
  // return our updated locations
  return locations;
}


/**
 * Our main script...
 * @method main
 */
function main() {
  var $lightboxImg = $('#lightbox img');

  // sections object for managing
  var sections = {
    loc: getSectionOffsets(),
    current: 'about'
  };

  // if we're home with no hash, go ahead and make about active
  if (atHome) {
    if (!hasHash) {
      $('.nav-item-about').addClass('active');
    } else {
      var sel = window.location.hash.slice(1);
      $('nav-item-' + sel).addClass('active');
    }
  }


  // turn scrollSpy on
  scrollSpy = true;


  // contact link -- no peeking!
  // not a perfect solution but its good enough for my purposes.
  $('.footer a.peek').click(function(){
    // on click, replace the href with our contact link, encoded from prying bot eyes
    $(this).attr('href', atob('bWFpbHRvOm1lQHNoYXducmllZ2VyLmNvbQ=='));
  });
  $('.footer a.peek').focusout(function(){
    // when the link looses focus, put the hash back.
    $(this).attr('href', '#');
  });


  // closing the lightbox, any click will close
  $('#lightbox').click(function(){
    $(this).fadeOut('slow');
    $(window).off('scroll.lightbox');
    $('#lightbox img').attr('src', '');
  });


  // smooth scroll from navigation
  $('.navbar-nav li a').click(function(){
    // we are only handling this on the homepage
    if (atHome) {

      // avoid the ui glitch when scrollspy is on, set active class manually here
      scrollSpy = false;
      $('#main-nav ul li').removeClass('active');
      $(this).parent().addClass('active');

      // remove leading slash
      var id = $(this).attr('href').slice(1);
      // scroll page to the desired section
      scrollToObject( $(id), {callback: function(){
        // turn scrollspy back on
        scrollSpy = true;
      }} );
    }
  });


  // scroll to top button
  // when users click the arrow, they are transported back to the top of the page
  $('.to-top-arrow').click(function(){
    // scroll to top of #main div
    scrollToObject($('#main'));
    // hide the arrow until next time
    $(this).hide();
  });


  // monitor window resize, we'll need to reposition the scroll to top arrow
  $(window).resize(function(){
    // resizing can push elements up and down the page, we'll recalculate
    // their positions first
    sections.loc = getSectionOffsets();
    // get left offset from top section
    var secOffsetLeft = $('section').first().offset().left;
    // depending on how condesned the window is, we'll place the arrow just off
    // the window edge or just of the section edge
    var rightPos = (secOffsetLeft < 45) ? '10px' : (secOffsetLeft-45) + 'px';
    $('.to-top-arrow').css({right: rightPos, top: '80px'});
  });


  // Handle everything that requires scroll position here
  $(window).scroll(function(){

    // to top arrow visibility
    var yoffset = window.pageYOffset;
    var isVisible = $('.to-top-arrow').is(':visible');
    // toggle visiblity of our 'back to top' arrow
    if ( (yoffset >= 100 && !isVisible) || (yoffset < 100 && isVisible) ) {
      $('.to-top-arrow').toggle();
    }

    // ScrollSpy
    // ############################
    if (scrollSpy) {
      var curSec = ''; // current section
      // itterate through each section
      for (var i = 0; i < sections.loc.length; i++) {
        // if section position is greater than current offset + header
        if ((window.pageYOffset + 50) > sections.loc[i].pos) {
          curSec = sections.loc[i].id; // update current section
        }
      }
      // if curSec is different from the last spyed location, update
      if (curSec !== sections.current) {
        // remove all active classes from nav links
        $('#main-nav ul li').removeClass('active');
        // update last spyed location and add active class.
        sections.current = curSec;
        // location.assign('#' + curSec);
        $('.nav-item-' + sections.current).addClass('active');
      }
    }
  });


  //  ========================
  //  START MASONRY PHOTO GRID
  //  ========================

  // identify our grid to use with masonry
  var $msnry = $('.photo-group');
  // get our initial set of photos
  var $photos = getPhotos();
  // append photos to grid
  $msnry.append($photos);

  // set initial on click events
  $photos.find('img').click(function(){
    // get large image link and set to lightbox
    var src = $(this).data('large');
    $lightboxImg.attr('src', src);
    // show the lightbox
    $('#lightbox').fadeIn('slow');
    var current = $(window).scrollTop();
    $(window).on('scroll.lightbox', function() {
      $(window).scrollTop(current);
    });
  });

  // monitor first set of photos for load completion
  $photos.imagesLoaded().always( function() {
    // images are loaded, lets initialize the grid
    $msnry.masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
    // since we added page content, lets updated our section locations
    sections.loc = getSectionOffsets();
  });

  // load more images button
  $('.load-photos').click(function(){
    // we are loading 6 photos, only need to scroll once
    var scrollOnce = false;
    // load our next set of random photos
    var $photos = getPhotos();
    // lets hide the photos before we append them
    $photos.hide();
    $msnry.append($photos);

    // we'll use imagesLoaded to see when each img if fully loaded
    $photos.imagesLoaded().progress( function( imgLoad, image ) {
      // get the parent grid-item
      var $item = $(image.img).parents('.grid-item');

      // set our click event for the lightbox
      $(image.img).click(function(){
        // get large image link and set to lightbox
        var src = $(this).data('large');
        $lightboxImg.attr('src', src);
        // show the lightbox
        $('#lightbox').fadeIn('slow');
        var current = $(window).scrollTop();
        $(window).on('scroll.lightbox', function() {
          $(window).scrollTop(current);
        });
      });

      // images is loaded, we can show it and update masonry
      $item.show();
      $msnry.masonry( 'appended', $item );

      // we've added elements to the page, time to update our section locations
      sections.loc = getSectionOffsets();

      // scroll to the first new photo we load, no more
      if (!scrollOnce) {
        scrollOnce = true;
        scrollToObject($item, {offset: 160});
      }
    });

    // hide the button if we have no more images left
    if (photoBin.photos.length < 1) // eslint-disable-line
      $(this).fadeOut();
  });

  //  ======================
  //  END MASONRY PHOTO GRID
  //  ======================


  // when we click on the collapsed nav, we need it to close
  $(document).on('click','.navbar-collapse.collapse.in a',function() {
    $('#main-nav').collapse('hide');
  });


  // lazy, fire this resize event to properly position our scroll to top arrow
  window.dispatchEvent(new Event('resize'));
}


// go, go, go
$('document').ready(main());
