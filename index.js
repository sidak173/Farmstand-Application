const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies').then(() => {
    console.log("connection open!")
})
    .catch((err) => {
        console.log("error", err);
    })
// uses movies database

const movieschema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    Rating: String
})

const Movie = mongoose.model(]'Movie', movieschema) // first letter must be capital
// mongo will make a collection movies -lowercase and pluralized

const amadeus=new Movie({ title: 'Amadeus', year: 1986, score: 8.7, Rating: 'R' });

// amadeus.save()

Movie.insertMany(
    [{ title: 'prestige', year: 2004, score: 9.7, Rating: 'R' },
    { title: 'terminal', year: 2009, score: 8, Rating: 'PG-13' }]
)
