<?php
include '../config.php';

if (ob_get_length()) ob_clean();

header('Content-Type: application/json');

try {
    $admin = isset($_GET['admin']) && $_GET['admin'] == 1;

    $query = "SELECT * FROM courses WHERE is_deleted = 0";
    if (!$admin) {
        $query .= " AND display_status = 1";
    }

    $stmt = $pdo->query($query);
    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($courses, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>