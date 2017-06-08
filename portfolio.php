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

  $portfolio = array(
    'pandora'       => 'Pandora Radio',
    'mlb'           =>  'MLB.TV',
    'revision3'     => 'Revision3',
    'suicidegirls'  => 'SuicideGirls',
    'nhl'           => 'NHL.TV',
    'ted'           => 'TED',
    'gbtv'          => 'GBTV',
    'accuweather'   => 'Accuweather'
  );

  if (!isset($portfolio[$id]))
    exit();

  $_SESSION['title'] = 'Shawn Rieger | Portfolio | ' . $portfolio[$id];

?>

<!DOCTYPE html>
<html lang="en">

<!-- include header -->
<?php include 'parts/header.php'; ?>

<body>
  <!-- include navigation -->
  <?php include 'parts/nav.php' ?>

  <div id="main">
    <!-- include specified portfolio page -->
    <?php include 'parts/portfolio/' . $id . '.php'; ?>

    <section>
      <div class="content">
          <a href="/#portfolio"></a>
      </div>
    </section>

  </div>

  <!-- include footer -->
  <?php include 'parts/footer.php'; ?>

</body>
</html>
