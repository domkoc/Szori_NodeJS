// Import express:
import express, {NextFunction, Request, Response} from 'express';
import { Hello } from '../schemas/hello';
var createError = require('http-errors');

// Create a new express router:
const router = express.Router();

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

// Specify that 'name' is a query parameter of type 'string':
interface RequestQuery {
    name: string;
}

/* GET request: */
router.get('/', async (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response, next: NextFunction) => {
    // Get the 'name' query param:
    let name: String = req.query.name;
    let query = { name: name };
    let hello = await Hello.findOne(query);
    if (hello) {
        // Send response:
        res.send(hello.message);
    } else {
        return next(createError.NotFound())
    }
});


// Export the router:
export default router;
