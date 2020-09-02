const lyricsFinder = require('lyrics-finder');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.get('/file', function(req, res) {
    if (Object.keys(req.query).length === 0) {
        res.render('pages/file', {
            files: []
        });
    }
});
app.get('/', function(req, res) {
    if (Object.keys(req.query).length === 0) {
        res.render('pages/index', {
            lyrics: "",
            song_to_find: "",
            artist_to_find: "",
        });
    } else {
        var artist_to_find = req.query.artist_to_find;
        var song_to_find = req.query.song_to_find;
        (async(artist, title) => {
            let lyrics = await lyricsFinder(artist, title) || "Not Found!";
            res.render('pages/index', {
                lyrics: lyrics,
                song_to_find: song_to_find,
                artist_to_find: artist_to_find,
            });
        })(artist_to_find, song_to_find);
    }
});

app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));