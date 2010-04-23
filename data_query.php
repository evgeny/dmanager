<?php

include("db.php");
set_time_limit(0);
    
ini_set('display_errors', true); 
error_reporting(E_ALL);

$type = $_POST['type'];

if ($type == 'device_search') 
{
    $device_data = get_search_string($_REQUEST['device_data']);
    
	$res = array();
	$q = "SELECT devices.id as id, name, description, location, title, first_name, last_name, address, phone, email ".
         "FROM devices JOIN persons ON persons.id = devices.person_id ".
         "WHERE MATCH (name, description) ".
		 "AGAINST ( ? IN BOOLEAN MODE )";

    if ($stmt = $db->prepare($q)) {
        $stmt->bind_param("s", $device_data);
        $stmt->execute();
        $stmt->bind_result($id, $name, $description, $location, $title, $first_name, $last_name, $address, $phone, $email);
            
        while ($stmt->fetch()) {
            $res[] = array("id" => $id, "name" => $name, "description" => utf8_encode($description), "location" => $location,
            "title" => $title, "first_name" => $first_name, "last_name" => $last_name, "address" => $address,
            "phone" => $phone, "email" => $email);
        }
        $stmt->close();
    }
    echo json_encode($res);
} else if($type == 'add_device') {
    $name = $_POST['device-name'];
    $description = $_POST['device-description'];
    $location = $_POST['device-location'];

    $id = -1;
    $result = 0;
    
    if (isset($_POST['person_id'])) {
        $person_id = $_POST['person_id'];
    } else {
        $person_title = $_POST['person-title'];
        $person_first_name = $_POST['person-first-name'];
        $person_last_name = $_POST['person-last-name'];
        $person_address = $_POST['person-address'];
        $person_phone = $_POST['person-phone'];
        $person_email = $_POST['person-email'];
        
        $q = "INSERT INTO persons (title, first_name, last_name, address, phone, email) VALUES (?,?,?,?,?,?)";

        if ($stmt = $db->prepare($q)) {
            $stmt->bind_param("ssssss", $person_title, $person_first_name, $person_last_name, $person_address, $person_phone, $person_email);
            $stmt->execute();
            $result = $stmt->affected_rows;
            $stmt->close();
        }
        
        $q = "SELECT id FROM persons WHERE last_name=? AND first_name=? LIMIT 1";
        
        if ($stmt = $db->prepare($q)) {
            $stmt->bind_param("ss", $person_last_name, $person_first_name);
            $stmt->execute();
            $stmt->bind_result($id);
            while ($stmt->fetch()) {
                $person_id = $id;
            }
            $stmt->close();
        }
    }
    
    $q = "INSERT INTO devices (name, description, location, person_id) VALUES (?,?,?,?)";

        if ($stmt = $db->prepare($q)) {
            $stmt->bind_param("ssss", $name, $description, $location, $person_id);
            $stmt->execute();
            $result = $stmt->affected_rows;
            $stmt->close();
        }
	
    echo $result;
} else if ($type == 'remove_device') {
    $q = "DELETE FROM devices where id=?";
    $result = 0;
    
    if ($stmt = $db->prepare($q)) {
        $stmt->bind_param("s", $_POST['id']);
        $stmt->execute();
        $result = $stmt->affected_rows;
        $stmt->close();
    }
	
    echo $result;
    
} else if($type == 'get_persons') {
	$res = array();
	$q = "SELECT id, title, first_name, last_name, address, phone, email FROM persons";

    if ($stmt = $db->prepare($q)) {
        $stmt->execute();
        $stmt->bind_result($id, $title, $first_name, $last_name, $address, $phone, $email);
            
        while ($stmt->fetch()) {
            $res[] = array("id" => $id, "title" => $title, "first_name" => $first_name, 
            "last_name" => $last_name, "address" => $address, "phone" => $phone, "email" => $email);
        }
        $stmt->close();
    }
    echo json_encode($res);
} else if($type == 'checklogin') {
    @session_start();
    if(isset($_SESSION['username'])) echo $_SESSION['username'];
    else echo 0;
} else if($type == 'log_out') {
    @session_start();
    @session_unset();
    @session_destroy();
}


function get_search_string($str) {
    $words = array();
    $words = explode(" ", $str);
    $result_string = "";
    for ($i = 0; $i < count($words); $i++) {
        $result_string = $result_string."+".$words[$i]." "; 
    }
    return $result_string;
}
?>
