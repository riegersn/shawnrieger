<?php

  /**
   * parts/header.php
   * by riegersn
   *
   * Default page header
   */

   $defaults = array(
     'title' => 'Shawn Rieger | Application/Front-End Developer | Welcome'
   );

   if (isset($_SESSION)) {
     $defaults = array_merge($defaults, $_SESSION);
   }

?>

<head>
 <title><?php echo $defaults['title']; ?></title>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <link href="https://fonts.googleapis.com/css?family=Open+Sans|Rubik:500|Merriweather:300" rel="stylesheet">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 <link rel="stylesheet" type="text/css" href="/style/main.css">
</head>
