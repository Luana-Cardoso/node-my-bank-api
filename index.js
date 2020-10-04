import express from 'express';
import {promises} from 'fs';
import accountsRouter from './routes/accounts.js';
import winston from 'winston';

const app = express();
const port = 3000;

global.fileName = "accounts.json";

const {combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({level, message, label, timestamp })=> {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: "my-bank-api.log"})

    ],
    format: combine(
        label({label: "my-bank-api"}),
        timestamp(),
        myFormat
    )
})

app.use(express.json());

app.use("/account", accountsRouter); //toda requisição de /account é redirecionada para accountsRouter


app.listen(port, async () => {
    try{ 
        await promises.readFile(global.fileName, "utf8")
        logger.info('Api started')
    } catch (err) {
        const initialJson = {
            accounts: [],
            nextId: 1,
        };     
            promises.writeFile(global.fileName, JSON.stringify(initialJson)).catch(err => {
                logger.error(err);
            });
    }
})