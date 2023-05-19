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
const hello_1 = require("../schemas/hello");
var createError = require('http-errors');
// Create a new express router:
const router = express_1.default.Router();
/* GET request: */
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the 'name' query param:
    let name = req.query.name;
    let query = { name: name };
    let hello = yield hello_1.Hello.findOne(query);
    if (hello) {
        // Send response:
        res.send(hello.message);
    }
    else {
        return next(createError.NotFound());
    }
}));
// Export the router:
exports.default = router;
//# sourceMappingURL=hello_service.js.map