"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movies = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let MovieIdSchema = new mongoose_1.default.Schema({
    id: Number
});
let MovieSchema = new mongoose_1.default.Schema({
    id: MovieIdSchema,
    title: String,
    year: Number,
    director: String,
    actor: [String]
});
let MoviesSchema = new mongoose_1.default.Schema({
    movie: [MovieSchema]
});
exports.Movies = mongoose_1.default.model('Movies', MoviesSchema, 'Movies');
//# sourceMappingURL=movie.js.map