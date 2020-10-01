const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./backend/config/key');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://jongwon123:jongwon123@cluster0.qem6e.mongodb.net/movie-app?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then (r => console.log('MongoDB Connected...'))
    .catch( err => console.log(err));

app.use('/api/users',require('./backend/routes/users'));
app.use('/api/favorite', require('./backend/routes/favorite'));

console.log('process.env.NODE_ENV? ',process.env.NODE_ENV);
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    if (process.env.NODE_ENV === "production") {
        console.log('client[static][movie-app] call!')
        // Set static folder
        // All the javascript and css files will be read and served from this folder
        app.use(express.static("frontend/build"));
        // index.html for all page routes    html or routing and navigation
        console.log('fixed path[movie-app]!')
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "./frontend", "build", "index.html"));
        });
    }
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));