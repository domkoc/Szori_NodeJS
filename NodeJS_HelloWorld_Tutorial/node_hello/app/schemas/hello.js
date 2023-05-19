"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hello = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let HelloSchema = new mongoose_1.default.Schema({
    name: String,
    message: String
});
exports.Hello = mongoose_1.default.model('Hello', HelloSchema, 'Hello');
//# sourceMappingURL=hello.js.map