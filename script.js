
const apiKey = 'a414db1bd19f449f942abba6e2e7b532';
const apiUrl = 'https://newsapi.org/v2/top-headlines?country=in';
const pageSize = 15; 
let currentPage = 1;

function fetchNews(page) {
    fetch(`${apiUrl}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const newsArticles = document.getElementById('news-articles');
            newsArticles.innerHTML = '';

            articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');
                articleElement.innerHTML = `
                    <h2>${article.title}</h2>
                    <img src="${article.urlToImage}" alt="${article.title}">
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
                `;
                newsArticles.appendChild(articleElement);
            });

            const pagination = document.getElementById('pagination');
            const totalPages = Math.ceil(data.totalResults / pageSize);
            pagination.innerHTML = '';

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.classList.add('btn', 'btn-secondary');
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    fetchNews(currentPage);
                });
                pagination.appendChild(pageButton);
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

// function fetchKeralaNews() {
//     fetch(`${apiUrl}&q=kerala&apiKey=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             const articles = data.articles;
//             const newsArticles = document.getElementById('news-articles');
//             newsArticles.innerHTML = '';

//             articles.forEach(article => {
//                 const articleElement = document.createElement('div');
//                 articleElement.classList.add('article');
//                 articleElement.innerHTML = `
//                     <h2>${article.title}</h2>
//                     <img src="${article.urlToImage}" alt="${article.title}">
//                     <p>${article.description}</p>
//                     <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
//                 `;
//                 newsArticles.appendChild(articleElement);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching Kerala news:', error);
//         });
// }

fetchNews(currentPage);

document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search').value;
    if (searchInput.trim() !== '') {
        apiUrl = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=${apiKey}`;
        fetchNews(currentPage);
    }
});

document.getElementById('kerala-news-btn').addEventListener('click', () => {
    fetchKeralaNews();
});
