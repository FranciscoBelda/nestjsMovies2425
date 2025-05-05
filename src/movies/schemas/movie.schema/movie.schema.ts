import { Schema, Types } from "mongoose";

const ImdbSchema = new Schema({
    rating: { type: Number, min: 0, max: 10 },
    votes: { type: Number, min: 0, integer: true }
}, {_id: false});

export const MovieSchema = new Schema({
    title: { type: String, required: true, index: true },
    year: { type: Number, default: new Date().getFullYear(), min: 1888, max: new Date().getFullYear(), integer: true },
    director: { type: String, required: true },
    plot: { type: String, required: true },
    poster: { type: String, required: true },
    genres: [{ type: String, required: true, index: true /* , enum: ['Action', 'Comedy', 'Drama', ...] */ }],
    imdb: { type: ImdbSchema, required: false }
}, { versionKey: false, timestamps: true});
