/*
 * Licensed under the MIT license
 * by Shawn Rieger / shawnrieger.com
 */

$(function(){

  // track page view
  mixpanel.track('page-viewed', { // eslint-disable-line
    'page-title' : document.title,
    'page-url' : window.location.pathname
  });


  var shawnRieger = {
    scrollSpy: true,
    contact: 'bWFpbHRvOm1lQHNoYXducmllZ2VyLmNvbQ==',
    atHome: (window.location.pathname === '/'),
    hash: window.location.hash,
    sections: {
      loc: [],
      current: 'about'
    },
    noblock: {
      css: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css',
        integrity: 'sha256-7TyXnr2YU040zfSP+rEcz29ggW4j56/ujTPwjMzyqFY='
      }]
    }
  };


  // set active tab
  if (shawnRieger.atHome) {
    var selector = '.nav-item-' + ((!shawnRieger.hash) ? 'about' : shawnRieger.hash.slice(1));
    $(selector).addClass('active');
  }


  // Scrolls the window to the given object
  var scrollToObject = function($object, offset) {
    if (typeof $object === 'object' && typeof $object.offset === 'function') {
      shawnRieger.scrollSpy = false; // we don't want this active while animating
      $('html,body').finish().animate({
        scrollTop: $object.offset().top - 50 - (offset || 0)
      }, 750, function() {
        shawnRieger.scrollSpy = true;
      });
    }
  };


  // hide contact link not a perfect solution but its enough for my purposes.
  $('.footer a.peek')
    .click(function() { $(this).attr('href', atob(shawnRieger.contact)); })
    .focusout(function() { $(this).attr('href', '#'); });


  // track links tagged with .track-link
  mixpanel.track_links('.track-link', 'link-clicked'); // eslint-disable-line
  $('button[data-name]').click(function(){
    mixpanel.track('button-clicked', { 'button-name' : $(this).data('name') }); // eslint-disable-line
  });



  // TO TOP ARROW START -------------------------------------------------------
  var $tta = $('.to-top-arrow');

  var positionTopArrow = function inv() {
    var secOffsetLeft = $('section').first().offset().left;
    var rightPos = (secOffsetLeft < 45) ? '10px' : (secOffsetLeft-45) + 'px';
    $tta.css({right: rightPos, top: '80px'});
    return inv;
  }();

  var toggleTopArrow = function inv() {
    var yoffset = window.pageYOffset;
    var isVisible = $('.to-top-arrow').is(':visible');
    if ( (yoffset >= 100 && !isVisible) || (yoffset < 100 && isVisible) ) {
      $tta.toggle();
    }
    return inv;
  }();

  // scroll to top button
  $tta.click(function(){
    $(this).fadeOut();
    scrollToObject($('#main'));
  });

  // positionTopArrow();
  $(window).on('scroll.toTopArrow', toggleTopArrow);
  $(window).on('resize.toTopArrow', positionTopArrow);
  // ------------------------------------------------------- TO TOP ARROW START



  // SCROLLSPY START ----------------------------------------------------------
  // Gets the offset top position for each section tag
  var getSectionOffsets = function() {
    var locs = $('section').map(function(){
      return {
        id: $(this).attr('id'),
        pos: Math.floor($(this).offset().top)
      };
    });
    return locs.get();
  };

  // resizing can push elements up and down the page, we'll recalculate
  $(window).resize(function(){
    shawnRieger.sections.loc = getSectionOffsets();
  });

  $(window).on('scroll.scrollSpy', function() {
    // do nothing if scrollSpy is off
    if (!shawnRieger.scrollSpy) return;

    // lets see what section we are currently in
    var curSec = shawnRieger.sections.loc.reduce(function(last, loc) {
      if ((window.pageYOffset + 55) > loc.pos) return loc.id;
      return last;
    }, '');

    if (curSec !== shawnRieger.sections.current) {
      $('#main-nav ul li').removeClass('active');
      $('.nav-item-' + curSec).addClass('active');
      shawnRieger.sections.current = curSec;
    }
  });
  // ------------------------------------------------------------ SCROLLSPY END



  // NAVIGATION START ---------------------------------------------------------
  // set .active on manu items
  $('.navbar-nav li a').on('click', function(){
    if (shawnRieger.atHome) { // only on main page
      $('#main-nav ul li').removeClass('active');
      $(this).parent().addClass('active');
      var id = $(this).attr('href').slice(1); // remove leading slash
      scrollToObject($(id));
    }
  });

  // close collapsed nav on click
  $(document).on('click','.navbar-collapse.collapse.in a',function() {
    $('#main-nav').collapse('hide');
  });
  // ----------------------------------------------------------- NAVIGATION END



  // PHOTOGRAPHY GRID START ---------------------------------------------------
  var $msnry = $('.photo-group');
  var $photos = photoBin.getPhotos(); // eslint-disable-line

  $msnry.append($photos);

  $photos.imagesLoaded().always( function() {
    $msnry.masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
    shawnRieger.sections.loc = getSectionOffsets();
  });

  // load more images button
  $('.load-photos').click(function(){
    var scrollOnce = false;
    var $photos = photoBin.getPhotos().hide(); // eslint-disable-line

    $msnry.append($photos);

    $photos.imagesLoaded().progress( function( imgLoad, image ) {
      var $item = $(image.img).parents('.grid-item');

      $item.show();
      $msnry.masonry( 'appended', $item );

      // we've added elements to the page, time to update our section locations
      shawnRieger.sections.loc = getSectionOffsets();

      // scroll to the first new photo we load, no more
      if (!scrollOnce) {
        scrollOnce = true;
        scrollToObject($item, 75);
      }
    });

    // hide the button if we have no more images left
    if (photoBin.photos.length < 1) // eslint-disable-line
      $(this).fadeOut();
  });
  // --------------------------------------------------------- END MASONRY GRID

});
