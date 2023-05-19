import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helloService from './services/hello_service';
import mongoose from 'mongoose';

const app: Application = express();
const PORT: number = 3000;

app.use(bodyParser.json());

app.use("/hello", helloService);

app.use('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});

mongoose.connect('mongodb://127.0.0.1:27017/hello')
.then(res => {
    console.log("Connected to MongoDB");
    app.listen(PORT, (): void => {
        console.log('Listening on:', PORT);
    });
})
.catch(err => console.log(err));
