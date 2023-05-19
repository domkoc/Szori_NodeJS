// Import express:
import express, {NextFunction, Request, Response} from 'express';
import { Movies } from '../schemas/movie';
import e from 'express';
var createError = require('http-errors');

// Create a new express router:
const router = express.Router();

// GET /movies:
interface GetMoviesRequestParams {}
interface GetMoviesResponseBody {}
interface GetMoviesRequestBody {}
interface GetMoviesRequestQuery {}
router.get('/', async (req: Request<GetMoviesRequestParams, GetMoviesResponseBody, GetMoviesRequestBody, GetMoviesRequestQuery>, res: Response, next: NextFunction) => {
    let movies = await Movies.find({});
    if (movies) {
        // Send response:
        res.send(movies);
    } else {
        return next(createError.NotFound());
    }
});

// GET /movies/{id}:
interface GetMovieByIdeRequestParams {}
interface GetMovieByIdResponseBody {}
interface GetMovieByIdRequestBody {}
interface GetMovieByIdRequestQuery {}

// Export the router:
export default router;
