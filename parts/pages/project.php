<?php

  /**
   * portfolio.php
   * by riegersn
   *
   * Portfolio View
   * (/portfolio/pandora -> /portfolio.php?id=pandora)
   */

  function getPortfolioItem($id) {
    $file = json_decode(file_get_contents('../../portfolio.json'));
    foreach ($file->portfolioItems as $index => $obj) {
      if ($obj->id == $id) return $obj;
    }
    return false;
  }

  if (!isset($_GET['id'])) exit();
  if (!$portfolio = getPortfolioItem( $_GET['id'] )) exit();

  // get proj title, splash & create screenshot array
  $splash  = '/img/portfolio/' . $portfolio->id . '/' . $portfolio->id . '_splash.jpg';
  $screens = array();

  // scan proj img dir for files
  $files = scandir('../../img/portfolio/' . $portfolio->id);
  foreach ($files as $file) {
    if ( strpos($file, '_screen_') !== false )
      $screens[] = $file;
  }

  // set the page title
  $_SESSION['title'] = 'Shawn Rieger | Projects | ' . $portfolio->name;

?>

<!DOCTYPE html>
<html lang="en">

<!-- include header -->
<?php include '../header.php'; ?>

<body>
  <!-- include navigation -->
  <?php include '../nav.php' ?>

  <div id="main">
    <section id="project">

      <!-- header splash, auto loaded from _splash file in the proj img dir -->
      <div class="header-image" style="background-image:url('<?=$splash?>')">
      </div>
      <div class="content">
        <ol class="breadcrumb">
          <li><a href="/">Home</a></li>
          <li><a href="/#portfolio">Portfolio</a></li>
          <li class="active"><?=$portfolio->name?></li>
        </ol>

        <!-- Project Name -->
        <h3><?=$portfolio->name?></h3>

        <!-- Company Info -->
        <?php if ($portfolio->aboutCompany) { ?>
          <hr><p><?=$portfolio->aboutCompany?></p>
        <?php } ?>

        <!-- Project Info -->
        <?php if ($portfolio->aboutProject) { ?>
          <hr><p><?=$portfolio->aboutProject?></p>
        <?php } ?>


        <!-- Feature List -->
        <?php if ($portfolio->features) { ?>
          <hr><h3><small>Application Features</small></h3><ul>
            <?php foreach ($portfolio->features as $key => $value) { ?>
              <li><?=$value?></li>
            <?php } ?>
          </ul>
        <?php } ?>

        <!-- Languages -->
        <?php if ($portfolio->lang) { ?>
          <hr><ul class="list-inline">
            <?php foreach ($portfolio->lang as $key => $value) { ?>
              <li><code><?=$value?></code></li>
            <?php } ?>
          </ul>
        <?php } ?>

        <!-- Github Link -->
        <?php if ($portfolio->git) { ?>
          <hr><ul class="list-inline">
            <li><a class="track-link" href="<?=$portfolio->git?>" target="_blank"><img class="git-icon" src="/img/general/github.png" alt="">View on Github</a></li>
          </ul>
        <?php } ?>

        <!-- portfolio proj images, auto populated from *_screen_* files in the img dir -->
        <?php if ($screens) { ?>
          <hr><div class="row gallery">
            <?php foreach ($screens as $index => $filename) { ?>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <a class="thumbnail<?php if ($portfolio->nsfw) echo ' nsfw' ?>" href="/img/portfolio/<?=$portfolio->id?>/<?=$filename?>" data-fancybox="<?=$portfolio->id?>">
                    <img src="/img/portfolio/<?=$portfolio->id?>/<?=$filename?>">
                </a>
              </div>
            <?php } ?>
          </div>
        <?php } ?>

      </div> <!-- .content -->
    </section> <!-- #showcase -->
  </div> <!-- #main -->

  <!-- include footer -->
  <?php include '../footer.php'; ?>

</body>
</html>
