<?php
session_start();

use DB\Database;

require("db/database.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    if (!isset($_SESSION["user"])) {
        header("Location: login.html");
        // echo "Login Succesfull";
    } else {

        $usr = $_SESSION["user"];
        echo "<h1>" . $usr["email"] . "</h1><br>";
        echo "<h1>" . $usr["fname"] . "</h1>";
        // echo $usr["email"];
        // echo $usr["email"];
        exit;
    }
}if ($_SERVER["REQUEST_METHOD"] == "GET") {

    if (!isset($_SESSION["user"])) {
        header("Location: login.html");
        // echo "Login Succesfull";
    } else {

        $usr = $_SESSION["user"];
        echo "<h1>" . $usr["email"] . "</h1><br>";
        echo "<h1>" . $usr["fname"] . "</h1>";
        // echo $usr["email"];
        // echo $usr["email"];
        exit;
    }
}

if (count($usr) != 0) {
    if ($usr["password"] != $_POST["pass1"]) {
        echo "Invalid login credentials";
        exit;
    }
    $_SESSION["user"] = $usr;
    echo "Login Succusseful";
    // header("Location: home.php");
}
