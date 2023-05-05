'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const hello_1 = require("../schemas/hello");
const router = express.Router();
router.get('/', (req, res) => {
    let name = req.query.name.toString();
    let query = { name: name };
    hello_1.Hello.findOne(query, function (err, hello) {
        if (err) {
            res.json({ info: 'Error executing query.', error: err });
        }
        if (hello) {
            res.json({ info: 'Message found', data: hello.message });
        }
        else {
            res.json({ info: 'Message not found by name: ' + name });
        }
    });
});
exports.default = router;
//# sourceMappingURL=hello_service.js.map