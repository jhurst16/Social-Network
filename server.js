const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./Routes/api-routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/the-social-network', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//this logs and executes the mongo queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on port: ${PORT}`));