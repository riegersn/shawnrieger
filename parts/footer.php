<?php

  /**
   * parts/footer.php
   * by riegersn
   *
   * Default page footer
   */

  if (isset($_SESSION)) {
   $defaults = array_merge($defaults, $_SESSION);
  }

?>


<!-- include our 'to top' arrow -->
<div class="to-top-arrow">
</div>


<footer class="footer">
  <div class="content">
    <div class="row">
      <div class="col-xs-12 col-sm-3 text-center">
        <h4 class="links-header"><small>Links</small></h4>
        <ul class="list-unstyled">
          <li><a href="/">Home</a></li>
          <li><a class="peek" href="#" target="_blank" rel="nofollow">Contact Me</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
        </ul>
      </div>
    <div class="row">
      <div class="col-xs-12 col-sm-3 text-center">
        <h4 class="links-header"><small>Connect with me</small></h4>
        <ul class="list-unstyled">
          <li><a href="https://www.facebook.com/riegersn" target="_blank">Facebook</a></li>
          <li><a href="https://twitter.com/riegersn" target="_blank">Twitter</a></li>
          <li><a href="https://www.linkedin.com/in/riegersn/" target="_blank">LinkedIn</a></li>
          <li><a href="https://github.com/riegersn" target="_blank">GitHub</a></li>
          <li><a href="http://riegersn.tumblr.com/" target="_blank">Tumblr</a></li>
          <li><a href="https://500px.com/riegersn" target="_blank">500px</a></li>
        </ul>
      </div>
      <div class="col-xs-12 col-sm-5 text-center">
        <h4 class="links-header"><small>made with</small><img class="love" src="/img/general/love.png" alt="LOVE"></h4>
        <img class="made-with" src="/img/general/built-with.png" alt="Built with Bootstrap, jQuery, Sass, Gulp, and NodeJS">
      </div>
      <div class="col-xs-12 text-center">
        <h4 class="copy-notice"><small>&copy; 2017 Shawn Rieger &mdash; All Rights Reserved.</small></h4>
      </div>
    </div>
  </div>
</footer>


<!-- scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<?php if ($defaults['includes']['masonry'] === true) { ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.0/masonry.pkgd.min.js" integrity="sha256-YFADoQJIYFj+isdXssMGUrmsVNbVDfN5m8jPgVN+9m4=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/4.1.2/imagesloaded.min.js" integrity="sha256-VC4gpGBDKiyXJhHygvqwm6pHHF11cmXTXal2qHqTMmA=" crossorigin="anonymous"></script>
<?php } ?>

<?php if ($defaults['includes']['bootstrap'] === true) { ?>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<?php } ?>

<?php if ($defaults['includes']['fancybox'] === true) { ?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js" integrity="sha256-wzoq0P7w2qLzRcJsF319y6G9Oilk3nU5CZ8tnY9TjFI=" crossorigin="anonymous"></script>
<?php } ?>

<!-- start Mixpanel --><script type="text/javascript">(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
mixpanel.init("80e96131f7fa80a5ea01a5336a0b6941");</script><!-- end Mixpanel -->

<?php if ($defaults['includes']['main'] === true) { ?>
  <script type="text/javascript" src="/js/main.min.js"></script>
<?php } ?>
