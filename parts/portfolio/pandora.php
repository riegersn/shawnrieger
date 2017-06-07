<?php

  /**
   * parts/portfolio/pandora.php
   * by riegersn
   *
   * Portfolio Section / Pandora
   */

   $dir    = './img/portfolio/apps/pandora';
   $files = scandir($dir);

   $screens = [];

   foreach ($files as $file) {
     if ( strpos($file, '_screen_') !== false)
      $screens[] = $file;
   }

?>

<section id="showcase">
  <div class="header-image portfolio-pandora">
  </div>
  <div class="content">
    <h3>Pandora Radio</h3>
    <p>Pandora Internet Radio (also known as Pandora Radio or simply Pandora) is a music streaming and automated music recommendation service powered by the Music Genome Project. The service, operated by Pandora Media, Inc., is available only in Australia, New Zealand, and the United States. The service plays musical selections of a certain genre based on the user's artist selection. The user then provides positive or negative feedback (as "thumbs up" or "thumbs down") for songs chosen by the service, and the feedback is taken into account in the subsequent selection of other songs to play.</p>
    <hr>
    <p>I was tasked with building a fully functional Pandora application for the Boxee TV using <code>JavaScript</code> and <code>QML</code>. The functional design was straight forward, as we were working off a similar design from an older version of Pandora that ran on the original Boxee Box. The old design ran in a 720p environment while the new one would need to support 1080p, so the graphical assets had to be recreated by our graphics designer.</p>
    <p>With my new assets in hand, I got to work building the initial structure. The entire app would be contained within a single window with panels that (I referenced as 'blades') would slide up over the main control blade which always remained open during normal operation.</p>
    <p>All in all the Pandora application supported the following features and requirements...</p>
    <ul>
      <li>Basics. Full play, pause, skip support</li>
      <li>Thumbs up/down support &amp; tracking</li>
      <li>Station creation from currently playing artist, track, song, and search.</li>
      <li>Station deletion.</li>
      <li>Full search. Artist, album, song.</li>
      <li>Skip tracking. Implementing Pandora's skipping rules.</li>
      <li>Pandora ad support</li>
      <li>Device linking between the Boxee TV device and the Pandora service</li>
      <li>Pandora user account authentication</li>
    </ul>
    <hr>
    <a href="https://github.com/riegersn/pandora-btv" target="_blank"><img class="git-icon" src="/img/general/github.png" alt="">View on Github</a>
    <hr>
    <div class="row">
      <?php
        foreach ($screens as $filename) {
          echo "<div class=\"col-xs-12 col-sm-6 col-md-4\">
                  <a href=\"#\" class=\"thumbnail\">
                    <img src=\"/img/portfolio/apps/pandora/{$filename}\">
                  </a>
                </div>";
        }
      ?>
    </div>
  </div>
</section>
