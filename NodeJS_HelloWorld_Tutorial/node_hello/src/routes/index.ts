'use strict';

import * as express from 'express';
import helloService from '../services/hello_service';

const router = express.Router();

// Register the hello service:
router.use('/hello', helloService);

/* GET home page. */
router.get('/',(req,res,next) => {
  res.render('index', {title: 'Express'});
});

export default router;