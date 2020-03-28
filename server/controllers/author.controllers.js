const Author = require('../models/author.models');

module.exports.getAuthors = (req, res) => {
    Author.find()
        .then(authors => res.json(authors))
        .catch(errors => res.json(errors));
}

module.exports.getAuthor = (req, res) => {
    const id = req.params.id;
    Author.find({ _id: id })
        .then(author => res.json(author))
        .catch(errors => res.json(errors));
}

module.exports.createAuthor = (req, res) => {
    const { name } = req.body;
    Author.create({ name: name })
        .then(createdAuthor => res.json(createdAuthor))
        .catch(errors => res.json(errors));
}

module.exports.updateAuthor = (req, res) => {
    const { name } = req.body;
    const id = req.params.id;
    Author.updateOne({ _id: id }, { name: name }, { new: true })
        .then(updatedAuthor => res.json(updatedAuthor))
        .catch(errors => res.json(errors));
}

module.exports.deleteAuthor = (req, res) => {
    const id = req.params.id;
    Author.deleteOne({ _id: id })
        .then(results => res.json(results))
        .catch(errors => res.json(errors));
}

module.exports.deleteAuthors = (req, res) => {
    Author.deleteMany()
        .then(results => res.json(results))
        .catch(errors => res.json(errors));
}