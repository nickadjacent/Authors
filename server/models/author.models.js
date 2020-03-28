const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: [5, `'name' must always be at least 5 characters. :(`]
    }
}, { timestamps: true });

const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;