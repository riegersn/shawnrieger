<?php

  /**
   * index.php
   * by riegersn
   *
   * shawnrieger.com
   */

 ?>

<!DOCTYPE html>
<html lang="en">

<!-- include header -->
<?php include 'parts/header.php'; ?>

<body>

<!-- include navigation -->
<?php include 'parts/nav.php' ?>

<div id="main">
  <?php
    // include all 5 sections for our main page
    include 'parts/sections/about.php';
    include 'parts/sections/work.php';
    include 'parts/sections/portfolio.php';
    include 'parts/sections/photography.php';
    include 'parts/sections/resume.php';
  ?>
</div>

<!-- Include our footer -->
<?php include 'parts/footer.php'; ?>

</body>
</html>
