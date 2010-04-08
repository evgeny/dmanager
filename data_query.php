<?php

include("db.php");
set_time_limit(0);
    
ini_set('display_errors', true); 
error_reporting(E_ALL);

$type = $_POST['type'];
//$type = "device_search";
//$device_data = "microscope";

if ($type == 'device_search') 
{
    $device_data = get_search_string($_REQUEST['device_data']);
    
	$res = array();
	$q = "SELECT name, description, location, title, first_name, last_name, address, phone, email ".
         "FROM devices JOIN persons ON persons.id = devices.person_id ".
         "WHERE MATCH (name, description) ".
		 "AGAINST ( ? IN BOOLEAN MODE )";

    if ($stmt = $db->prepare($q)) {
        $stmt->bind_param("s", $device_data);
        $stmt->execute();
        $stmt->bind_result($name, $description, $location, $title, $first_name, $last_name, $address, $phone, $email);
            
        while ($stmt->fetch()) {
            $res[] = array("name" => $name, "description" => utf8_encode($description), "location" => $location,
            "title" => $title, "first_name" => $first_name, "last_name" => $last_name, "address" => $address,
            "phone" => $phone, "email" => $email);
        }
        $stmt->close();
    }
    //print_r($res);
    echo json_encode($res);
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
