import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

import LookupRouter from "./integrations/nilu/routes/lookup.route";

// Configure `dotenv` so that environment variables can be used
dotenv.config();

// NOTE: START OF MONGOOSE SHIT
const dbString: string = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
console.log(`Attempting to connect to: ${dbString}`)
mongoose.connect(dbString).then((m) => {
    console.log("[mongodb] Connected to MongoDB database");
}).catch((e) => {
    console.error("[mongodb] Failed to connect to MongoDB database");
    console.error(e);
});
// NOTE: END OF MONGOOSE SHIT

const PORT = process.env.PORT;

const app: Express = express();

app.use(bodyParser.json());

// Use `morgan` for logging
app.use(morgan("dev"));

app.use("/lookup", LookupRouter);

app.get("/", (request: Request, response: Response) => {
    response.json({"Hello": "World"});
});

// Listen for connections to the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});