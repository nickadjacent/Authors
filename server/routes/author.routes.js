const authorController = require('../controllers/author.controllers');

module.exports = app => {
    app.get('/api/authors', authorController.getAuthors);

    app.get('/api/authors/:id', authorController.getAuthor);

    app.post('/api/authors/new', authorController.createAuthor);

    app.put('/api/authors/edit/:id', authorController.updateAuthor);

    app.delete('/api/authors/:id', authorController.deleteAuthor);

    app.delete('/api/authors', authorController.deleteAuthors);

}