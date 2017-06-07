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
        $bs_col_class = 'col-xs-12 col-sm-6';
        $thumb = '/img/portfolio/apps/%s/%s_thumb.jpg';

        $portfolio = array(
          'pandora'       => 'Pandora Radio',
          'mlb'           => 'MLB.TV',
          'revision3'     => 'Revision3',
          'suicidegirls'  => 'SuicideGirls',
          'nhl'           => 'NHL.TV',
          'ted'           => 'TED',
          'gbtv'          => 'GBTV',
          'accuweather'   => 'Accuweather'
        );

        foreach ($portfolio as $id => $name) {
          $bg_img = sprintf($thumb, $id, $id);
          echo "<div class=\"${bs_col_class}\">
                  <a href=\"/portfolio/${id}\" data-projectid=\"${id}\">
                    <div class=\"${outer_class} ${id}\" style=\"background-image:url('${bg_img}')\">
                    </div>
                  </a>
                </div>";
        }
      ?>
    </div>
  </div>
</section>
