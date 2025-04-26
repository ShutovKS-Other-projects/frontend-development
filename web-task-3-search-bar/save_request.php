<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $query = $_POST['query'] ?? '';

    $stmt = $pdo->prepare("INSERT INTO requests (title, url) VALUES (?, ?)");
    $stmt->execute([$query, '#']); // URL можно адаптировать по необходимости

    $searchTerm = "%$query%";
    $stmt = $pdo->prepare("SELECT title, url FROM requests WHERE title LIKE ?");
    $stmt->execute([$searchTerm]);
    $results = $stmt->fetchAll();

    echo "<h2>Результаты для: $query</h2>";
    foreach ($results as $row) {
        echo "<div class='results-item'>";
        echo "<h3>{$row['title']}</h3>";
        echo "<p>URL: <a href='{$row['url']}'>{$row['url']}</a></p>";
        echo "</div>";
    }
}
?>