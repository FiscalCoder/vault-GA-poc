const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const tasks = require('./routes/api/tasks');
const keys = require("./config/keys")

require('./config/passport')(passport);

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.listen(9000);


(async () => {

    const { data } = await keys().catch(err => console.log(err))
    mongoose.connect(data.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() =>
            console.log('MongoDB successfully connected.')
        ).catch(err => console.log(err));

})();



app.use(passport.initialize());

app.use('/api', users);
app.use('/tasks', tasks);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
