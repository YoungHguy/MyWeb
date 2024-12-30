document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    
    const editBtn = document.getElementById('editArticle');
    const deleteBtn = document.getElementById('deleteArticle');
    const editForm = document.getElementById('editForm');
    const editArticleForm = document.getElementById('editArticleForm');
    const cancelEditBtn = document.getElementById('cancelEdit');

    let currentArticle = null;

    // 加载文章内容
    function loadArticle() {
        const articles = JSON.parse(localStorage.getItem('articles') || '[]');
        currentArticle = articles[articleId];

        if (currentArticle) {
            document.title = `${currentArticle.title} - 我的博客`;
            document.getElementById('articleTitle').textContent = currentArticle.title;
            document.getElementById('articleContent').textContent = currentArticle.content;
        } else {
            window.location.href = 'index.html';
        }
    }

    // 显示编辑表单
    editBtn.addEventListener('click', function() {
        document.getElementById('editTitle').value = currentArticle.title;
        document.getElementById('editSummary').value = currentArticle.summary;
        document.getElementById('editContent').value = currentArticle.content;
        editForm.classList.remove('hidden');
    });

    // 隐藏编辑表单
    cancelEditBtn.addEventListener('click', function() {
        editForm.classList.add('hidden');
    });

    // 处理文章编辑
    editArticleForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const articles = JSON.parse(localStorage.getItem('articles') || '[]');
        articles[articleId] = {
            title: document.getElementById('editTitle').value,
            summary: document.getElementById('editSummary').value,
            content: document.getElementById('editContent').value
        };

        localStorage.setItem('articles', JSON.stringify(articles));
        loadArticle();
        editForm.classList.add('hidden');
    });

    // 处理文章删除
    deleteBtn.addEventListener('click', function() {
        if (confirm('确定要删除这篇文章吗？')) {
            const articles = JSON.parse(localStorage.getItem('articles') || '[]');
            articles.splice(articleId, 1);
            localStorage.setItem('articles', JSON.stringify(articles));
            window.location.href = 'index.html#articles';
        }
    });

    loadArticle();
}); 