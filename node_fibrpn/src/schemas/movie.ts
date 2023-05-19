//------------------------------------------------------------
import mongoose from 'mongoose';
import { IMovie } from '../interfaces/movie';
export interface MovieEntity extends IMovie, mongoose.Document { }

let MovieSchema = new mongoose.Schema({
    id: Number,
    title: String,
    year: Number,
    director: String,
    actor: [String]
});

export var Movie = mongoose.model<MovieEntity>('Movie', MovieSchema, 'Movies');
