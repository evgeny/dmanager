<?php
    $db = new mysqli('localhost', 'root' ,'', 'device_explorer');
    if(!$db) {
        echo 'ERROR: Could not connect to the database.';
        exit;
    }
?>
