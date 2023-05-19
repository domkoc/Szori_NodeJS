import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import movieService from './services/movie_service';
import mongoose from 'mongoose';

const app: Application = express();
const PORT: number = 3000;

app.use(bodyParser.json());

app.use("/movies", movieService);

mongoose.connect('mongodb://127.0.0.1:27017/fibrpn')
.then(res => {
    console.log("Connected to MongoDB");
    app.listen(PORT, (): void => {
        console.log('Listening on:', PORT);
    });
})
.catch(err => console.log(err));
