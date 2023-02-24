import express, { Response, Request } from "express";
import signupRouter from "./routes/signupRouter";
import signinRouter from "./routes/signinRouter";
import credentialsRouter from "./routes/credentialsRouter";
import networksRouter from "./routes/networksRouter";

//config
const app = express();
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.send("Ok!");
});

app.use(signupRouter);
app.use(signinRouter);
app.use(credentialsRouter);
app.use(networksRouter);

export default app;
