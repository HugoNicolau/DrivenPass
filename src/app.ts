import express, {Response, Request} from "express";
import dotenv from "dotenv";


//config
const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 5000;

app.get("/health", (req:Request, res:Response) => {
    res.send("Ok!");
})


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});