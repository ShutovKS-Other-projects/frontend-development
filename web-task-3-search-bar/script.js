document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const suggestionsDiv = document.getElementById('suggestions');
    const searchForm = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');

    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value.trim();
        suggestionsDiv.innerHTML = '';
        suggestionsDiv.style.display = 'none';

        if (query.length > 5) {
            try {
                try {
                    const response = await fetch(`search.php?query=${encodeURIComponent(query)}`);
                    if (!response.ok) throw new Error('HTTP error');
                    const text = await response.text();
                    const suggestions = text ? JSON.parse(text) : [];

                    if (suggestions.length > 0) {
                        suggestions.forEach(item => {
                            const div = document.createElement('div');
                            div.className = 'suggestion-item';
                            div.textContent = item.title;
                            div.onclick = () => {
                                searchInput.value = item.title;
                                suggestionsDiv.style.display = 'none';
                            };
                            suggestionsDiv.appendChild(div);
                        });
                        suggestionsDiv.style.display = 'block';
                    }
                } catch (error) {
                    console.error('Error:', error);
                    suggestionsDiv.style.display = 'none';
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
    });

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        resultsDiv.innerHTML = '';

        if (query) {
            try {
                const formData = new FormData();
                formData.append('query', query);

                const response = await fetch('save_request.php', {
                    method: 'POST',
                    body: formData
                });

                const results = await response.text();
                resultsDiv.innerHTML = results;
            } catch (error) {
                console.error('Error submitting search:', error);
            }
        }
    });
});