<?php

  /**
   * portfolio.php
   * by riegersn
   *
   * Portfolio View
   * (/portfolio/pandora -> /portfolio.php?id=pandora)
   */


  if (!isset($_GET['id']))
    exit();

  $id = $_GET['id'];

  // TODO: move all portfolio info into JSON
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

  // check for valid proj id
  if (!isset($portfolio[$id]))
    exit();

  // get proj title, splash & create screenshot array
  $title   = $portfolio[$id];
  $splash  = '/img/portfolio/' . $id . '/' . $id . '_splash.jpg';
  $screens = [];

  // scan proj img dir for files
  $files = scandir('./img/portfolio/' . $id);

  // filter only screenshot files and add them to our array
  foreach ($files as $file) {
    if ( strpos($file, '_screen_') !== false )
      $screens[] = $file;
  }

  // set the page title
  $_SESSION['title'] = 'Shawn Rieger | Portfolio | ' . $title;

?>

<!DOCTYPE html>
<html lang="en">

<!-- include header -->
<?php include 'parts/header.php'; ?>

<body>
  <!-- include navigation -->
  <?php include 'parts/nav.php' ?>

  <div id="main">
    <section id="showcase">

      <!-- header splash, auto loaded from _splash file in the proj img dir -->
      <div class="header-image" style="background-image:url('<?=$splash?>')">
      </div>
      <div class="content">
        <ol class="breadcrumb">
          <li><a href="/">Home</a></li>
          <li><a href="/#portfolio">Portfolio</a></li>
          <li class="active"><?=$title?></li>
        </ol>
        <h3><?=$title?></h3>

        <!-- include specified portfolio page text -->
        <?php include 'parts/portfolio/' . $id . '.php'; ?>

        <!-- portfolio proj images, auto populated from *_screen_* files in the img dir -->
        <div class="row gallery">
          <?php foreach ($screens as $filename) { ?>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <a class="thumbnail gallery-item">
                <img src="/img/portfolio/<?=$id?>/<?=$filename?>">
              </a>
            </div>
          <?php } ?>
        </div>

      </div> <!-- .content -->
    </section> <!-- #showcase -->
  </div> <!-- #main -->

  <!-- include lightbox component -->
  <?php include 'parts/components/lightbox.php'; ?>
  <?php include 'parts/components/to-top-arrow.php'; ?>

  <!-- include footer -->
  <?php include 'parts/footer.php'; ?>

  <!-- iclude our scripts -->
  <?php include 'parts/scripts.php'; ?>

</body>
</html>
