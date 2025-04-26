<?php
include '../config.php';

$id = $_GET['id'];
$status = $_GET['status'];

$stmt = $pdo->prepare("UPDATE courses 
    SET display_status = ?
    WHERE id = ?");
$success = $stmt->execute([$status, $id]);

header('Content-Type: application/json');
echo json_encode(['success' => $success]);
?>