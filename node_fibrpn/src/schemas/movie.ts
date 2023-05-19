import mongoose from 'mongoose';
import { IMovie, IMovieList } from '../interfaces/movie';
export interface MovieEntity extends IMovie, mongoose.Document { }
export interface MovieListEntity extends IMovieList, mongoose.Document { }
export interface MovieIdEntity extends IMovie, mongoose.Document { }
export interface MovieIdListEntity extends IMovieList, mongoose.Document { }

let MovieIdSchema = new mongoose.Schema({
    id: Number
});

let MovieSchema = new mongoose.Schema({
    id: MovieIdSchema,
    title: String,
    year: Number,
    director: String,
    actor: [String]
});

let MoviesSchema = new mongoose.Schema({
    movie: [MovieSchema]
});

export var Movies = mongoose.model<MovieListEntity>('Movies', MoviesSchema, 'Movies');
