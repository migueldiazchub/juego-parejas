<?php
  function test_input($data) {
    if($data == NULL) {
        return "";
    }
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  $username = test_input($_POST["username"]);
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Partida empezada</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <img id="cat-left" class="cat-image" src="./gatos/gato.png"/>
    <img id="cat-right" class="cat-image" src="./gatos/gato.png"/>
    <main id="start-window">
      <button id="game-start">EMPEZAR</button>
    </main>
    <main id="game-window" class="hidden">
      <section id="board"></section>
      <section id="data">
        <article class="data-box">
          <label>USER: </label>
          <p id="data-user" class="data-value">
            <?php echo $username ?>
          </p>
        </article>
        <article class="data-box">
          <label>SCORE: </label>
          <p id="data-score" class="data-value">0</p>
        </article>
        <article class="data-box">
          <label>TIME: </label>
          <p id="data-time" class="data-value"></p>
        </article>
      </section>
    </main>
    <main id="end-window" class="hidden">
      <div id="end-window-container">
        <form id="end-data" name="end_data" action="upload.php" method="post">
          <input id="username-display" class="end-data-display" name="username" type="text" readonly/>
          <input id="score-display" class="end-data-display" name="score" type="text" readonly/>
        </form>
        <nav id="end-nav">
          <button type="submit" form="end-data" id="upload-results" class="end-button">GUARDAR RESULTADOS</button>
          <button id="go-back" class="end-button">VOLVER SIN GUARDAR</button>
        </nav>
      </div>
    </main>
    <script type="module" src="game.js"></script>
  </body>
</html>
