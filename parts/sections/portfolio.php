<?php

  /**
   * parts/sections/portfolio.php
   * by riegersn
   *
   * Portfolio Section
   * Highlights my best work
   */

   $portfolio = json_decode(file_get_contents('portfolio.json'));

?>

<section id="portfolio">
  <div class="header-image portfolio"></div>
  <div class="content">
    <h3 class="heading">portfolio</h3>
    <div class="row">
      <?php foreach ($portfolio->portfolioItems as $project) { ?>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <a class="thumbnail" href="/portfolio/<?=$project->id?>">
            <div class="slider-img<?php if ($project->nsfw) echo ' nsfw'; ?>" style="background-image:url('<?=$project->thumb?>')">
            </div>
          </a>
        </div>
      <?php } ?>
    </div>
  </div>
</section>
