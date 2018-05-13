<?php
include "../../ServerInfo.php";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$query = "SELECT * FROM drinks;";
        
$result = $conn->query($query);
if ($conn->affected_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row['Drink'] . "," . $row['Quantity'] . "," . $row['Image'] . "<br>"; 
       /* $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, 'http://logos.wikia.com/wiki/' . $row['Drink']);
        $result = curl_exec($curl);
        
        echo $result;*/
    }
}


?>