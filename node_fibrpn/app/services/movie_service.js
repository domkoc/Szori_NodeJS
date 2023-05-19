"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import express:
const express_1 = __importDefault(require("express"));
const movie_1 = require("../schemas/movie");
const id_generator_1 = require("./id_generator");
var createError = require('http-errors');
// Create a new express router:
const router = express_1.default.Router();
router.get('/find', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderBy = req.query.orderby;
    if (orderBy == 'Title' || orderBy == 'Director') {
        let query = { year: req.query.year };
        let movies = yield movie_1.Movie.find(query, { _id: 0, __v: 0 }, { sort: orderBy.toLowerCase() });
        if (movies) {
            const movieIdList = {
                id: movies.map(m => m.id)
            };
            res.json(movieIdList);
        }
        else {
            return next(createError.NotFound());
        }
    }
}));
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let movies = yield movie_1.Movie.find({});
    if (movies) {
        const movieList = {
            movie: movies.map(m => {
                const movieResult = {
                    title: m.title,
                    year: m.year,
                    director: m.director,
                    actor: m.actor
                };
                return movieResult;
            })
        };
        res.json(movieList);
    }
    else {
        return next(createError.NotFound());
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query = { id: req.params.id };
    let movie = yield movie_1.Movie.findOne(query, { _id: 0, __v: 0 });
    if (movie) {
        res.json(movie);
    }
    else {
        return next(createError.NotFound());
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let movie = new movie_1.Movie(req.body);
    movie.id = (0, id_generator_1.getRandomInt)(100000);
    if (yield movie.save()) {
        res.json({ id: movie.id });
    }
    else {
        return next(createError.InternalServerError());
    }
}));
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield movie_1.Movie.findOneAndUpdate({ id: req.params.id }, req.body, { upsert: true })) {
        res.sendStatus(200);
    }
    else {
        return next(createError.InternalServerError());
    }
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield movie_1.Movie.deleteOne({ id: req.params.id })) {
        res.sendStatus(200);
    }
    else {
        return next(createError.InternalServerError());
    }
}));
// Export the router:
exports.default = router;
//# sourceMappingURL=movie_service.js.map