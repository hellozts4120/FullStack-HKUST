var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var favoriteSchema = new Schema({
    favlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});



// the schema is useless so far
// we need to create a model using it
var Favorites = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorites;
