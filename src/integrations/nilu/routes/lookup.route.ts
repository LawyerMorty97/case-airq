import { Router, Request, Response } from "express";
import { lookupAreas, lookupAQIs, lookupStations, lookupComponents, lookupMeanTypes, lookupTimeSeries } from "../controllers/lookup.controller";

const LookupRouter: Router = Router();

const getRoot = async (request: Request, response: Response) => {
    // Map each route to a simple list of routes
    const routes = LookupRouter.stack.map((s) => s.route.path);

    response.json(routes);
}

const getAreas = async (request: Request, response: Response) => {
    const areas = await lookupAreas();

    response.json(areas);
};

const getStations = async (request: Request, response: Response) => {
    const stations = await lookupStations();

    response.json(stations);
};

const getComponents = async (request: Request, response: Response) => {
    const components = await lookupComponents();

    response.json(components);
};

const getAQIs = async (request: Request, response: Response) => {
    const aqis = await lookupAQIs();

    response.json(aqis);
}

const getMeanTypes = async (request: Request, response: Response) => {
    const meanTypes = await lookupMeanTypes();

    response.json(meanTypes);
};

const getTimeSeries = async (request: Request, response: Response) => {
    const timeSeries = await lookupTimeSeries();

    response.json(timeSeries);
};

LookupRouter.get("/", getRoot);
LookupRouter.get("/areas", getAreas);
LookupRouter.get("/stations", getStations);
LookupRouter.get("/components", getComponents);
LookupRouter.get("/aqis", getAQIs);
LookupRouter.get("/meantypes", getMeanTypes);
LookupRouter.get("/timeseries", getTimeSeries);

export default LookupRouter;