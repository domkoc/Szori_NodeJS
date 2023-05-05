'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const hello_service_1 = require("../services/hello_service");
const router = express.Router();
router.use('/hello', hello_service_1.default);
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
exports.default = router;
//# sourceMappingURL=index.js.map