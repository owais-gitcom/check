<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Database connection
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "react_register";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  die(json_encode(["status" => "error", "message" => "Connection failed"]));
}

// Get JSON data from request
$data = json_decode(file_get_contents("php://input"), true);

$fullname = $conn->real_escape_string($data["fullname"]);
$email = $conn->real_escape_string($data["email"]);
$password = password_hash($data["password"], PASSWORD_BCRYPT);

// Insert into DB
$sql = "INSERT INTO users (fullname, email, password) VALUES ('$fullname', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
  echo json_encode(["status" => "success", "message" => "User registered"]);
} else {
  echo json_encode(["status" => "error", "message" => "Registration failed: " . $conn->error]);
}

$conn->close();
?>
  