<?php include 'config.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Courses</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<h1>Available Courses</h1>
<div class="courses-list">
    <?php
    $stmt = $pdo->query("SELECT * FROM courses WHERE display_status = 1 AND is_deleted = 0");
    while ($course = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo '<div class="course-card">';
        echo '<img src="images/' . $course['image'] . '" alt="' . $course['title'] . '">';
        echo '<h2>' . $course['title'] . '</h2>';
        echo '<p>' . $course['description'] . '</p>';
        echo '</div>';
    }
    ?>
</div>
<a href="admin.php" class="admin-link">Admin Panel</a>
</body>
</html>