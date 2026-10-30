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
    <title>Page Title</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main id="start-window">
      <button id="game-start">START</button>
    </main>
    <main id="game-window" class="hidden">
      <section id="board"></section>
      <section id="data">
        <article class="data-box">
          <label>USER: </label>
          <p id="data-user" class="data-value"></p>
        </article>
        <article class="data-box">
          <label>SCORE: </label>
          <p id="data-score" class="data-value"></p>
        </article>
        <article class="data-box">
          <label>TIME: </label>
          <p id="data-time" class="data-value"></p>
        </article>
      </section>
    </main>
    <script type="module" src="game.js"></script>
  </body>
</html>
