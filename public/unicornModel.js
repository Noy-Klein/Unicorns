var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const unicornModel = new Schema({
    name: String,
    magic: String
})

const Unicorn = mongoose.model('Unicorn', unicornModel)

module.exports = Unicorn;