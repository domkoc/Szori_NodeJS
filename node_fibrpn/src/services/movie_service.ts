// Import express:
import express, {NextFunction, Request, Response} from 'express';
import { IMovie, IMovieList, IMovieId, IMovieIdList } from '../interfaces/movie';
import { Movie } from '../schemas/movie';
import e from 'express';
import { getRandomInt } from './id_generator';

var createError = require('http-errors');

// Create a new express router:
const router = express.Router();

// GET /movies/find?year={year}&orderby={field}:
interface FindMoviesByYearRequestParams {}
interface FindMoviesByYearRequestBody {}
interface FindMoviesByYearRequestQuery {
    year: number;
    orderby: string;
}
router.get('/find', async (req: Request<
    FindMoviesByYearRequestParams, 
    IMovieIdList, 
    FindMoviesByYearRequestBody, 
    FindMoviesByYearRequestQuery
    >, res: Response<IMovieIdList>, next: NextFunction) => {
        const orderBy = req.query.orderby;
        
        if (orderBy == 'Title' || orderBy == 'Director') {
            let query = { year: req.query.year };
            let movies = await Movie.find(query, { _id: 0, __v: 0 }, { sort: orderBy.toLowerCase() });
            if (movies) {
                const movieIdList: IMovieIdList = {
                    id: movies.map(m => m.id)
                };
                res.json(movieIdList);
            } else {
                return next(createError.NotFound());
            }
        }
    }
);

// GET /movies:
interface GetMoviesRequestParams {}
interface GetMoviesRequestBody {}
interface GetMoviesRequestQuery {}
router.get('/', async (req: Request<
    GetMoviesRequestParams,
    IMovieList, 
    GetMoviesRequestBody, 
    GetMoviesRequestQuery
    >, res: Response<IMovieList>, next: NextFunction) => {
        let movies = await Movie.find({});
        if (movies) {
            const movieList: IMovieList = {
                movie: movies.map(m => {
                    const movieResult: IMovie = {
                        title: m.title,
                        year: m.year,
                        director: m.director,
                        actor: m.actor
                    };
                    return movieResult;
                })
            };
            res.json(movieList);
        } else {
            return next(createError.NotFound());
        }
    }
);
    
// GET /movies/{id}:
interface GetMovieByIdRequestParams {
    id: number;
}
interface GetMovieByIdResponseBody {}
interface GetMovieByIdRequestBody {}
interface GetMovieByIdRequestQuery {}
router.get('/:id', async (req: Request<
    GetMovieByIdRequestParams,
    GetMovieByIdResponseBody,
    GetMovieByIdRequestBody,
    GetMovieByIdRequestQuery
    >, res: Response, next: NextFunction) => {
        let query = { id: req.params.id };
        let movie = await Movie.findOne(query, { _id: 0, __v: 0 });
        if (movie) {
            res.json(movie);
        } else {
            return next(createError.NotFound());
        }
    }
);

// POST /movies:
interface PostMoviesRequestParams {}
interface PostMoviesRequestQuery {}
router.post('/', async (req: Request<
    PostMoviesRequestParams,
    IMovieId,
    IMovie,
    PostMoviesRequestQuery
    >, res: Response<IMovieId>, next: NextFunction) => {
        let movie = new Movie(req.body);
        movie.id = getRandomInt(100000);
        if (await movie.save()) {
            res.json({ id: movie.id });
        } else {
            return next(createError.InternalServerError());
        }
    }
);

// PUT /movies/{id}:
interface PutMovieByIdRequestParams {
    id: number;
}
interface PutMovieByIdResponseBody {}
interface PutMovieByIdRequestQuery {}
router.put('/:id', async (req: Request<
    PutMovieByIdRequestParams,
    PutMovieByIdResponseBody,
    IMovie,
    PutMovieByIdRequestQuery
    >, res: Response, next: NextFunction) => {
        if (await Movie.findOneAndUpdate({ id: req.params.id }, req.body, { upsert: true })) {
            res.sendStatus(200);
        } else {
            return next(createError.InternalServerError());
        }
    }
);

// DELETE /movies/{id}:
interface DeleteMovieByIdRequestParams {
    id: number;
}
interface DeleteMovieByIdResponseBody {}
interface DeleteMovieByIdRequestQuery {}
router.delete('/:id', async (req: Request<
    DeleteMovieByIdRequestParams,
    DeleteMovieByIdResponseBody,
    IMovieId,
    DeleteMovieByIdRequestQuery
    >, res: Response, next: NextFunction) => {
        if (await Movie.deleteOne({ id: req.params.id })) {
            res.sendStatus(200);
        } else {
            return next(createError.InternalServerError());
        }
    }
);
        
// Export the router:
export default router;
        