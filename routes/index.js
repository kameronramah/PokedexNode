var express = require('express');
var router = express.Router();
const {getAllPokes, displayOnePoke, addToFavorite, displayFavorites, deleteFromFavorite, displayFormPokemon, updatePokemon} = require("../controllers/pokeController");

/* GET home page. */
router.get('/', getAllPokes);

router.post('/:name', addToFavorite);
router.get('/:name', displayOnePoke);

router.get('/my/favoris', displayFavorites);

router.get('/delete/:id', deleteFromFavorite);

router.get('/update/:id', displayFormPokemon)
router.post('/update/:id', updatePokemon)



module.exports = router;