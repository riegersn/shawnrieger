<?php

  /**
   * parts/sections/portfolio.php
   * by riegersn
   *
   * Portfolio Section
   * Highlights my best work
   */

?>

<section id="portfolio">
  <div class="header-image"></div>
  <div class="content">
    <h3 class="heading">portfolio</h3>
    <div class="row">
      <?php
        $outer_class = 'project';
        $bs_col_class = 'col-xs-12 col-sm-6 col-md-4';
        $thumb = '/img/portfolio/apps/%s/%s_thumb.png';

        $portfolio = array(
          'pandora'       => 'Pandora Radio',
          'revision3'     => 'Revision3',
          'mlb'           =>  'MLB.TV',
          'suicidegirls'  => 'SuicideGirls',
          'nhl'           => 'NHL.TV',
          'ted'           => 'TED',
          'accuweather'   => 'Accuweather',
          'gbtv'          => 'GBTV'
        );

        foreach ($portfolio as $id => $name) {
          $bg_img = sprintf($thumb, $id, $id);
          echo "<div class=\"${bs_col_class}\">
                  <a href=\"#\" data-projectid=\"${id}\">
                    <div class=\"${outer_class} ${id}\" style=\"background-image:url('${bg_img}')\">
                      <div class=\"maintain-aspect\"></div>
                    </div>
                  </a>
                </div>";
        }
      ?>
    </div>
  </div>
</section>
