<?php
require 'config.php';

$query = $_GET['query'] ?? '';

if (!empty($query) && strlen($query) > 5) {
    $searchTerm = "%$query%";
    $stmt = $pdo->prepare("SELECT title, url FROM requests WHERE title LIKE ? LIMIT 5");
    $stmt->execute([$searchTerm]);
    $results = $stmt->fetchAll();

    ob_clean();
    header('Content-Type: application/json');
    echo json_encode($results);
    exit;
}

ob_clean();
header('Content-Type: application/json');
echo json_encode([]);