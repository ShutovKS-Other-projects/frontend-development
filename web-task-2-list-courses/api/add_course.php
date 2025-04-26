<?php
include '../config.php';

header('Content-Type: application/json');

try {
    if (empty($_POST['title'])) throw new Exception('Title is required');
    if (empty($_FILES['image'])) throw new Exception('Image is required');

    $title = $_POST['title'];
    $description = $_POST['description'];
    $image = $_FILES['image'];

    $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($image['type'], $allowed_types)) {
        throw new Exception('Invalid image type');
    }

    $targetDir = "../images/";
    $fileName = uniqid() . '_' . basename($image["name"]);
    $targetFile = $targetDir . $fileName;

    if (!move_uploaded_file($image["tmp_name"], $targetFile)) {
        throw new Exception('Failed to upload image');
    }

    $stmt = $pdo->prepare("INSERT INTO courses (title, description, image) VALUES (?, ?, ?)");
    $stmt->execute([$title, $description, $fileName]);

    echo json_encode([
        'success' => true,
        'message' => 'Course added successfully'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}