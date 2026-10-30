<?php
  require "./lib/db.php";

  $collection = $client->$db->getCollection("users");

  $topPlayers = $collection->find([], 
    [
      "limit" => 5,
      "sort" => ["score" => -1]
    ]);

  $playerList = $scoreList = array();
  
  foreach($topPlayers as $player){
    $playerList[] = $player->username;
    $scoreList[] = $player->score;
  }

  while(count($playerList) < 5){
    $playerList[] = "";
    $scoreList[] = "0";
  }
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Page Title</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main id="game-window">
      <section id="top-player-list">
        <div class="top-player">
          <p class="player-data">NOMBRE: <?php echo $playerList[0] ?></p>
          <p class="player-data">PUNTUACIÓN: <?php echo $scoreList[0] ?></p>
        </div>
        <div class="top-player">
          <p class="player-data">NOMBRE: <?php echo $playerList[1] ?></p>
          <p class="player-data">PUNTUACIÓN: <?php echo $scoreList[1] ?></p>
        </div>
        <div class="top-player">
          <p class="player-data">NOMBRE: <?php echo $playerList[2] ?></p>
          <p class="player-data">PUNTUACIÓN: <?php echo $scoreList[2] ?></p>
        </div>
        <div class="top-player">
          <p class="player-data">NOMBRE: <?php echo $playerList[3] ?></p>
          <p class="player-data">PUNTUACIÓN: <?php echo $scoreList[3] ?></p>
        </div>
        <div class="top-player">
          <p class="player-data">NOMBRE: <?php echo $playerList[4] ?></p>
          <p class="player-data">PUNTUACIÓN: <?php echo $scoreList[4] ?></p>
        </div>
      </section>
      <form id="user-input" name="user-input" action="game.php" method="post">
        <input
          id="input-username"
          name="username"
          type="text"
          placeholder="Nombre de usuario"
        />
        <input id="input-submit" name="submit" type="submit" />
      </form>
    </main>
    <script></script>
  </body>
</html>
