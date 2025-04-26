<?php
include '../config.php';

$id = $_GET['id'];
$is_deleted = $_GET['is_deleted'];

$stmt = $pdo->prepare("UPDATE courses 
    SET is_deleted = ?
    WHERE id = ?");
$success = $stmt->execute([$is_deleted, $id]);

header('Content-Type: application/json');
echo json_encode(['success' => $success]);
?>