const mongoose = require('mongoose');

const gamesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter name'],
        minLength: [4, 'Name should be at least 4 characters long']
    },
    image:{
        type: String,
        required: [true, 'Please enter image address'],
        match: [/^https?:\/\//, 'Image URL should start with http://" or "https://']
    },
    price:{
        type: Number,
        required: [true, 'Please enter price'],
        min: [0, 'Price should be positive number']
    },
    description:{
        type: String,
        required: [true, 'Please enter description'],
        minLength: [10, 'Description should be at least 10 characters long']
    },
    genre:{
        type: String,
        required: [true, 'Please enter genre'],
        minLength: [2, 'Genre should be at least 2 characters long']

    },
    platform:{
        type: String,
        required: [true, 'Please enter platform'],
        enum:{
           values: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
           message: 'Platform must be one of the following options: "PC", "Nintendo", "PS4", "PS5", "XBOX"'
        } 
            
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Game = mongoose.model('Game', gamesSchema);

module.exports = Game;