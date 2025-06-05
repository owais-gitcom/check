<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow requests from all origins (adjust for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");



// Database credentials
$host = "localhost";
$db_name = "react_register";
$username = "root";
$password = "";

// Connect to DB
$conn = new mysqli($host, $username, $password, $db_name);
if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}

// Read raw JSON input exactly once
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput);

// Validate JSON input
if (!$data) {
    error_log("Invalid JSON or no data received: " . $rawInput);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON or no data received"
    ]);
    exit;
}

// Validate required fields
if (empty($data->email) || empty($data->password)) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields"
    ]);
    exit;
}

// Sanitize inputs (optional, your DB uses prepared statements anyway)
$email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
$password = $data->password;

// Debug: log email (remove in production)
error_log("Login attempt for email: " . $email);

// Prepare and execute SQL query safely
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Database prepare statement failed: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Check password hash
    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "status" => "success",
            "message" => "Login successful",
            "redirect_url" => "http://localhost:3000/Dashboard"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Incorrect password"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);
}

$stmt->close();
$conn->close();
