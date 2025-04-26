<?php
include '../config.php';

$id = $_POST['id'];
$title = $_POST['title'];
$description = $_POST['description'];
$image = $_FILES['image'] ?? null;

try {
    // Если загружено новое изображение
    if ($image && $image['error'] == UPLOAD_ERR_OK) {
        $targetDir = "../images/";
        $fileName = uniqid() . '_' . basename($image["name"]);
        $targetFile = $targetDir . $fileName;
        move_uploaded_file($image["tmp_name"], $targetFile);

        // Обновляем запись с новым изображением
        $stmt = $pdo->prepare("UPDATE courses 
            SET title = ?, description = ?, image = ?
            WHERE id = ?");
        $stmt->execute([$title, $description, $fileName, $id]);
    } else {
        // Обновляем без изменения изображения
        $stmt = $pdo->prepare("UPDATE courses 
            SET title = ?, description = ?
            WHERE id = ?");
        $stmt->execute([$title, $description, $id]);
    }

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>