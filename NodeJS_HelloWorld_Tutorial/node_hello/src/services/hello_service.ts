'use strict';

// Import express:
import * as express from 'express';
import { Hello } from '../schemas/hello';
// Create a new express router:
const router = express.Router();

/* GET request: */
router.get('/',(req,res) => {
    // Create a Mongoose query with the 'name' query param:
    let name: string = req.query.name.toString();
    let query = { name: name };
    // Execute query in the Hello schema:
    Hello.findOne(query, function(err, hello) {
        if (err) {
            res.json({info: 'Error executing query.', error: err});
        }
        if (hello) {
            res.json({info: 'Message found', data: hello.message});
        } else {
            res.json({info: 'Message not found by name: '+ name});
        }
    });
});

// Export the router:
export default router;