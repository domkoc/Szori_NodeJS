import mongoose from 'mongoose';
import { IHello } from '../interfaces/hello';

export interface HelloEntity extends IHello, mongoose.Document { }

let HelloSchema = new mongoose.Schema({
    name: String,
    message: String
});

export var Hello = mongoose.model<HelloEntity>('Hello', HelloSchema, 'Hello');
