window.addEventListener('DOMContentLoaded', () => {

        // Аккордеон FAQ
        const accHeaders = document.querySelectorAll('.accordion-header');
        accHeaders.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const body = btn.nextElementSibling;
                if (body.style.display === 'block') {
                    body.style.display = 'none';
                } else {
                    body.style.display = 'block';
                }
            });
        });

        // Cookie для приветствия
        const h1 = document.querySelector('h1');
        if (h1 && h1.textContent.includes('Добро пожаловать')) {
            if (document.cookie.includes('visited=true')) {
                h1.style.display = 'none';
            } else {
                document.cookie = 'visited=true; path=/; max-age=31536000';
            }
        }

        // Валидация формы
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', function (e) {
                const name = form.elements['name'].value.trim();
                const phone = form.elements['phone'].value.trim();
                const message = form.elements['message'].value.trim();
                let error = '';
                if (!name) error = 'Введите имя';
                else if (!/^([0-9\-\+\s\(\)]{7,})$/.test(phone)) error = 'Введите корректный телефон';
                else if (!message) error = 'Введите сообщение';
                if (error) {
                    e.preventDefault();
                    document.getElementById('formError').textContent = error;
                    document.getElementById('formError').style.display = 'block';
                }
            });
        }

        // Загрузка заявок
        const requestsList = document.getElementById('requests-list');
        if (requestsList) {
            fetch('/requests.json')
                .then(r => r.ok ? r.json() : [])
                .then(data => {
                    console.log(data);
                    if (!data.length) {
                        requestsList.innerHTML = '<div class="alert alert-info text-center mb-0">Заявок пока нет.</div>';
                    } else {
                        requestsList.innerHTML =
                            '<ul class="list-group list-group-flush">' +
                            data.map(item =>
                                `<li class="list-group-item">
                                    <div class="d-flex w-100 justify-content-between align-items-center">
                                        <div>
                                            <span class="fw-bold"><i class="bi bi-person-circle me-1"></i>${item.name}</span>
                                            <span class="text-muted ms-2"><i class="bi bi-telephone me-1"></i>${item.phone}</span>
                                        </div>
                                        <small class="text-muted">${item.date}</small>
                                    </div>
                                    <div class="mt-2">${item.message}</div>
                                </li>`
                            ).join('') +
                            '</ul>';
                    }
                })
                .catch(() => {
                    requestsList.innerHTML = '<div class="alert alert-danger text-center mb-0">Ошибка загрузки заявок.</div>';
                });
        }
    }
);