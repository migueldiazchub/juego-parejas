<?php
  require "./vendor/autoload.php";

  $uri = "mongodb+srv://mdiachu_db_user:h0ehKP8578sHntpU@cluster0.d8pxbgb.mongodb.net";
  $db = "gameDB";
  $client = new MongoDB\Client($uri);
?>