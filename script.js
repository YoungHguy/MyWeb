document.addEventListener('DOMContentLoaded', function() {
    const newArticleBtn = document.getElementById('newArticleBtn');
    const articleForm = document.getElementById('articleForm');
    const createArticleForm = document.getElementById('createArticleForm');
    const cancelArticleBtn = document.getElementById('cancelArticle');
    const articleGrid = document.querySelector('.article-grid');

    // 显示创建文章表单
    newArticleBtn.addEventListener('click', function() {
        articleForm.classList.remove('hidden');
    });

    // 隐藏创建文章表单
    cancelArticleBtn.addEventListener('click', function() {
        articleForm.classList.add('hidden');
        createArticleForm.reset();
    });

    // 修改创建文章卡片的代码
    function createArticleCard(article, index) {
        const articleCard = document.createElement('article');
        articleCard.className = 'article-card';
        articleCard.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.summary}</p>
            <a href="article.html?id=${index}">阅读更多</a>
        `;
        return articleCard;
    }

    // 修改文章提交处理代码
    createArticleForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const article = {
            title: document.getElementById('articleTitle').value,
            summary: document.getElementById('articleSummary').value,
            content: document.getElementById('articleContent').value
        };

        // 将新文章添加到网格中
        const articleCard = createArticleCard(article, 0);
        articleGrid.insertBefore(articleCard, articleGrid.firstChild);

        // 重置表单并隐藏
        createArticleForm.reset();
        articleForm.classList.add('hidden');

        saveArticleToLocalStorage(article);
    });

    // 保存文章到本地存储
    function saveArticleToLocalStorage(article) {
        let articles = JSON.parse(localStorage.getItem('articles') || '[]');
        articles.unshift(article);
        localStorage.setItem('articles', JSON.stringify(articles));
    }

    // 修改加载文章的代码
    function loadArticlesFromLocalStorage() {
        const articles = JSON.parse(localStorage.getItem('articles') || '[]');
        // 清空现有的示例文章
        articleGrid.innerHTML = '';
        articles.forEach((article, index) => {
            const articleCard = createArticleCard(article, index);
            articleGrid.appendChild(articleCard);
        });
    }

    // 页面加载时加载已保存的文章
    loadArticlesFromLocalStorage();
}); 