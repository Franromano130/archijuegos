const {Schema, model} = require("mongoose")

gamesSchema = new Schema  ({

    title: String,
    description: String,
    url: String,
    
})