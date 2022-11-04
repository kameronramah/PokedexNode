const { Poke, User} = require('../models/pokeModel');

const getAllPokes = (req, res) => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(res => res.json())
        .then(data => {
            res.render('index', {
                title: 'Tous les Pokémons',
                pokemons: data.results
            })
        })
}

const displayOnePoke = (req, res) => {
    const { name } = req.params;
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(res => res.json())
        .then(data => {
            res.render('pokemon', {
                title: name,
                infos: data
            })
        })
}


const addToFavorite = (req, res) => {
    const { name } = req.params;
    Poke.find({name: name})
        .then(pokemon => {
            if(pokemon.length === 0) {
                fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
                    .then(res => res.json())
                    .then(data => {
                        let name = data.name;
                        let id = data.id;
                        let height = data.height;
                        let weight = data.weight;
                        let image = data.sprites.back_default;
                        Poke.create({ name, id, height, weight, image })
                            .then(pokemon => res.json('pokemon bien ajouté aux favoris'))
                            .catch(err => res.json(err))
                    })
            }
            else {
                res.json('pokemon déjà présent dans les favoris')
            }
        })
}


const displayFavorites = (req, res) => {
    Poke.find()
        .then(pokemons => {
            res.render('favoris', {title: 'Mes favoris', pokemons: pokemons})
        })
        .catch(err => res.json(err))
}

const deleteFromFavorite = (req, res) => {
    const { id } = req.params;
    Poke.deleteOne({id: id})
        .then(() => res.json('Pokemon supprimé des favoris'))
        .catch(err => res.json(err))
}

const displayFormPokemon = (req, res) => {
    const { id } = req.params;
    Poke.find({id: id})
        .then(pokemon => {
            if(pokemon.length !== 0) {
                res.render('formPokemon', {
                    title: `Modification ${pokemon[0].name}`,
                    pokemon: pokemon[0]
                })
            }
            else {
                res.json('pokemon non présent dans les favoris')
            }
        })
}


const updatePokemon = (req, res) => {
    const { id } = req.params;
    const { name, height, weight, commentaire } = req.body;
    let { possede } = req.body;
    if(possede === 'on') {
        possede = true;
    }
    else {
        possede = false;
    }
    console.log(possede);
    Poke.find({id: id})
        .then(pokemon => {
            if (pokemon.length !== 0) {
                Poke.updateOne({id: id}, {
                    name,
                    height,
                    weight,
                    commentaire,
                    possede
                })
                    .then(() => res.json('Pokemon modifié'))
                    .catch(err => res.json(err))
            }
            else {
                res.json('pokemon non présent dans les favoris')
            }
        })
}


module.exports = {
    getAllPokes,
    displayOnePoke,
    addToFavorite,
    displayFavorites,
    deleteFromFavorite,
    displayFormPokemon,
    updatePokemon
}