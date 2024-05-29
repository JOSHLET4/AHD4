document.querySelectorAll('.comment-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const sectionId = this.closest('.comment-section').dataset.sectionId;
        const commentInput = this.querySelector('.comment-input');
        const commentText = commentInput.value.trim();

        if (commentText) {
            addCommentToUI(sectionId, commentText);
            saveCommentToLocalStorage(sectionId, commentText);
            commentInput.value = '';
        }
    });
});

function addCommentToUI(sectionId, text) {
    const commentList = document.querySelector(`.comment-section[data-section-id="${sectionId}"] .comment-list`);
    const commentItem = document.createElement('li');
    commentItem.className = 'comment';

    const commentContent = document.createElement('p');
    commentContent.textContent = text;
    commentItem.appendChild(commentContent);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
        commentList.removeChild(commentItem);
        removeCommentFromLocalStorage(sectionId, text);
    });

    commentItem.appendChild(deleteButton);
    commentList.appendChild(commentItem);
}

function saveCommentToLocalStorage(sectionId, comment) {
    let comments = localStorage.getItem(`comments-${sectionId}`);
    comments = comments ? JSON.parse(comments) : [];
    
    // Comprueba si el comentario ya existe para evitar duplicaciones.
    if (!comments.includes(comment)) {
        comments.push(comment);
        localStorage.setItem(`comments-${sectionId}`, JSON.stringify(comments));
    }
}

function removeCommentFromLocalStorage(sectionId, comment) {
    let comments = localStorage.getItem(`comments-${sectionId}`);
    if (comments) {
        comments = JSON.parse(comments);
        comments = comments.filter(c => c !== comment);
        localStorage.setItem(`comments-${sectionId}`, JSON.stringify(comments));
    }
}

function loadCommentsFromLocalStorage() {
    document.querySelectorAll('.comment-section').forEach(section => {
        const sectionId = section.dataset.sectionId;
        let comments = localStorage.getItem(`comments-${sectionId}`);
        if (comments) {
            comments = JSON.parse(comments);
            comments.forEach(comment => {
                addCommentToUI(sectionId, comment);
            });
        }
    });
}

// Carga comentarios cuando se carga la página.
document.addEventListener('DOMContentLoaded', function() {
    loadCommentsFromLocalStorage();
});