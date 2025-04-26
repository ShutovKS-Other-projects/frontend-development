document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('addForm');
    const editForm = document.getElementById('editForm');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const addCourseForm = document.getElementById('addCourseForm');
    const editCourseForm = document.getElementById('editCourseForm');
    const coursesList = document.querySelector('.admin-courses-list');

    let courses = [];

    const loadCourses = async () => {
        try {
            const response = await fetch('api/get_courses.php?admin=1');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error('Invalid response format');
            }

            courses = data;
            renderCourses();

        } catch (error) {
            console.error('Error loading courses:', error);
            alert('Failed to load courses: ' + error.message);
        }
    };

    const renderCourses = () => {
        coursesList.innerHTML = courses.map(course => `
            <div class="admin-course ${course.is_deleted ? 'deleted' : ''}" data-id="${course.id}">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <img src="images/${course.image}" alt="${course.title}">
                <div class="actions">
                    <button class="btn edit-btn">Edit</button>
                    <button class="btn toggle-display">
                        ${course.display_status ? 'Hide' : 'Show'}
                    </button>
                    ${course.is_deleted ?
            `<button class="btn restore-btn">Restore</button>` :
            `<button class="btn btn-danger delete-btn">Delete</button>`}
                </div>
            </div>
        `).join('');
    };

    addCourseBtn.addEventListener('click', () => {
        addCourseForm.classList.toggle('hidden');
        editCourseForm.classList.add('hidden');
    });

    coursesList.addEventListener('click', async (e) => {
        const courseDiv = e.target.closest('.admin-course');
        const id = courseDiv.dataset.id;
        const course = courses.find(c => c.id == id);

        if (e.target.classList.contains('edit-btn')) {
            showEditForm(course);
        } else if (e.target.classList.contains('toggle-display')) {
            await toggleDisplayStatus(id, course.display_status ? 0 : 1);
        } else if (e.target.classList.contains('delete-btn')) {
            await deleteCourse(id, 1);
        } else if (e.target.classList.contains('restore-btn')) {
            await deleteCourse(id, 0);
        }
    });

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(addForm);
        await handleFormSubmit(formData, 'add_course.php');
        addForm.reset();
        addCourseForm.classList.add('hidden');
    });

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(editForm);
        await handleFormSubmit(formData, 'update_course.php');
        editCourseForm.classList.add('hidden');
    });

    const showEditForm = (course) => {
        editCourseForm.classList.remove('hidden');
        addCourseForm.classList.add('hidden');
        editForm.querySelector('[name="id"]').value = course.id;
        editForm.querySelector('[name="title"]').value = course.title;
        editForm.querySelector('[name="description"]').value = course.description;
    };

    const handleFormSubmit = async (formData, url) => {
        try {
            const response = await fetch(`api/${url}`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                await loadCourses();
            } else {
                alert(result.error || 'Operation failed');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Request failed: ' + error.message);
        }
    };

    const toggleDisplayStatus = async (id, status) => {
        await fetch(`api/toggle_visibility.php?id=${id}&status=${status}`);
        await loadCourses();
    };

    const deleteCourse = async (id, isDeleted) => {
        await fetch(`api/delete_course.php?id=${id}&is_deleted=${isDeleted}`);
        await loadCourses();
    };

    loadCourses();
});