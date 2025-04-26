<?php include 'config.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
    <button id="addCourseBtn" class="btn">Add New Course</button>

    <!-- Add Course Form -->
    <div id="addCourseForm" class="form-container hidden">
        <h2>Add New Course</h2>
        <form id="addForm">
            <input type="text" name="title" placeholder="Title" required>
            <textarea name="description" placeholder="Description" required></textarea>
            <input type="file" name="image" accept="image/*" required>
            <button type="submit" class="btn">Add Course</button>
        </form>
    </div>

    <!-- Edit Course Form -->
    <div id="editCourseForm" class="form-container hidden">
        <h2>Edit Course</h2>
        <form id="editForm">
            <input type="hidden" name="id">
            <input type="text" name="title" placeholder="Title" required>
            <textarea name="description" placeholder="Description" required></textarea>
            <input type="file" name="image" accept="image/*">
            <button type="submit" class="btn">Update Course</button>
        </form>
    </div>

    <!-- Courses List -->
    <div id="coursesList">
        <h2>All Courses</h2>
        <div class="admin-courses-list"></div>
    </div>
</div>

<script src="js/admin.js"></script>
</body>
</html>