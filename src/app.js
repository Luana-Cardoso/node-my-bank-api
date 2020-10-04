import express from 'express';
import routerAccounts from '../routes/routerAccounts';

const app = express();

app.use(express.json());
app.use(routerAccounts);

app.get('/', (_, res) => {
    res.send("API started")
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});