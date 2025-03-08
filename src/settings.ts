import express, {Request, Response} from "express";

const app = express()

app.use(express.json())

app.get('/', (req:Request, res:Response) => {
    res.send(200).json({version: "2:0"})
})