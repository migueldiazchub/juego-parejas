<?php
    require "./lib/db.php";

    function test_input($data) {
        if($data == NULL) {
            return "";
        }
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $username = $score = "";

    $username = test_input($_POST["username"]);
    $score = test_input($_POST["score"]);

    try {
        $collection = $client->$db->getCollection("users");
        $collection->insertOne([
            "username" => $username,
            "score" => $score,
        ]);
        echo "Los datos se han guardado. Se va a regresar a la página inicial";
    } catch (Exception $e) {
        echo $e;
    } 
?>

<script>
    setTimeout(() => {
        window.location.href = "index.php";
    }, 3000);
</script>