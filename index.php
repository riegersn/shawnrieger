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

  <!-- Include any components we want to add to the page  -->
  <?php
    include 'parts/components/lightbox.php';
    include 'parts/components/to-top-arrow.php';
  ?>

  <!-- Include our footer -->
  <?php include 'parts/footer.php'; ?>

</body>
</html>
