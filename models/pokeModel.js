const mongoose = require('mongoose');

const pokeSchema = new mongoose.Schema({
    name: String,
    id: Number,
    height: Number,
    weight: Number,
    image: String,
    commentaire: String,
    possede: Boolean
})

const Poke = mongoose.model('Poke', pokeSchema);

module.exports = {Poke};