import {Schema} from "mongoose";

export const MovieSchema =
    new Schema({
    title: {type: String, required:true},
    year: {type: Number, default: new Date().getFullYear()},
    director: {type: String, required: true},
    plot: {type: String, required: true},
    poster: {type: String, required: true},
    genres: [{type: String, required: true}],
    imdb: {
        rating: {type: Number, required: true},
        votes: {type: Number, required: true}
    }
}, {versionKey:false});
