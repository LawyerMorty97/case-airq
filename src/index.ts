import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

import LookupRouter from "./integrations/nilu/routes/lookup.route";

// Configure `dotenv` so that environment variables can be used
dotenv.config();

const PORT = process.env.PORT;

console.log(`Running in \`${process.env.NODE_ENV}\``);
console.log(`MongoDB host: \`${process.env.DATABASE_HOST}\``);

// Setup connection to our MongoDB database
mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`).then((m) => {
    console.log("[mongodb] Connected to MongoDB database");
}).catch((e) => {
    console.error("[mongodb] Failed to connect to MongoDB database");
    console.error(e);
});

const app: Express = express();

app.use(bodyParser.json());

// Use `morgan` for logging
app.use(morgan("dev"));

app.use("/lookup", LookupRouter);

app.get("/", (request: Request, response: Response) => {
    response.json({
        "/lookup": "Provides access to looking up air quality data."
    });
});

// Listen for connections to the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});