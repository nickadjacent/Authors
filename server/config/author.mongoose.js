const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/author_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connected to database"))
    .catch(error => console.log(`Failed to connect to database: ${error}`));