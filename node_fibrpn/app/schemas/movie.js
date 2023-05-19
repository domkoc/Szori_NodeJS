"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
//------------------------------------------------------------
const mongoose_1 = __importDefault(require("mongoose"));
let MovieSchema = new mongoose_1.default.Schema({
    id: Number,
    title: String,
    year: Number,
    director: String,
    actor: [String]
});
exports.Movie = mongoose_1.default.model('Movie', MovieSchema, 'Movies');
//# sourceMappingURL=movie.js.map