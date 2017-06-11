<?php

  /**
   * parts/header.php
   * by riegersn
   *
   * Default page header
   */

   $defaults = array(
     'title' => 'Shawn Rieger | Application/Front-End Developer | Welcome',
     'description' => ''
   );

   if (isset($_SESSION)) {
     $defaults = array_merge($defaults, $_SESSION);
   }

?>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo $defaults['title']; ?></title>
  <meta name="description" content="<?php echo $defaults['description']; ?>">
  <meta name="keywords" content="front-end developer, front-end development, application developer, web designer">
  <meta name="robots" content="noodp">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans|Rubik:500|Merriweather:300" rel="stylesheet">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="/style/main.css">
</head>
