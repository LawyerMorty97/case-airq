import { Model, InferSchemaType } from "mongoose";
import {
    LookupAirQualityIndex,
    LookupAirQualityIndexModel,
    LookupArea,
    LookupAreaModel,
    LookupComponent,
    LookupComponentModel,
    LookupMeanType,
    LookupMeanTypeModel,
    LookupStation,
    LookupStationModel,
    LookupTimeSeries,
    LookupTimeSeriesModel,
} from "../models/lookup.model";

const API_URL = "https://api.nilu.no/lookup";

interface FetchedResource<DataType> {
    shouldPersist: boolean;
    data: DataType[];
}

type KeyOf<T> = Extract<keyof T, string>;

const fetchResource = async <ModelType>(endpoint: string, model: Model<ModelType>): Promise<FetchedResource<any>> => {
    // Attempt to fetch the resource from the API,
    // if a connection isn't possible, retrieve results
    // from the database.
    let shouldPersist: boolean = false;
    let data = null;
    try {
        const response = await fetch(`${API_URL}/${endpoint}`);
        // return await response.json();
        data = await response.json();
        shouldPersist = true;
    } catch (error) {
        console.error("Failed to retreive resource, retrieving from persisted storage");
        data = await model.find();
    }

    return {shouldPersist, data};
}

const persistData = async <Resource, ModelType>(resource: FetchedResource<Resource>, model: Model<ModelType>, key: KeyOf<Resource>) => {
    // Only persist data if the resource is considered to be
    // safe to be stored.
    if (resource.shouldPersist) {
        resource.data.forEach(async (record) => {
            await model.findOneAndUpdate(
                // @ts-ignore
                { String(key): record[key] },
                record as object,
                {upsert: true}
            );
        });
    }
}

export const lookupAreas = async (): Promise<LookupArea[]> => {
    const areas: FetchedResource<LookupArea> = await fetchResource("areas", LookupAreaModel);

    await persistData(areas, LookupAreaModel, "area");

    return areas.data;
}

export const lookupStations = async (): Promise<LookupStation[]> => {
    const stations: FetchedResource<LookupStation> = await fetchResource("stations", LookupStationModel);

    await persistData(stations, LookupStationModel, "id");

    return stations.data;
}

export const lookupComponents = async (): Promise<LookupComponent[]> => {
    const components: FetchedResource<LookupComponent> = await fetchResource("components", LookupComponentModel);

    await persistData(components, LookupComponentModel, "component");

    return components.data;
}

export const lookupAQIs = async (): Promise<LookupAirQualityIndex[]> => {
    const aqis: FetchedResource<LookupAirQualityIndex> = await fetchResource("aqis", LookupAirQualityIndexModel);

    await persistData(aqis, LookupAirQualityIndexModel, "component");

    return aqis.data;
}

export const lookupMeanTypes = async (): Promise<LookupMeanType[]> => {
    const meanTypes: FetchedResource<LookupMeanType> = await fetchResource("meantypes", LookupMeanTypeModel);

    await persistData(meanTypes, LookupMeanTypeModel, "id");

    return meanTypes.data;
}

export const lookupTimeSeries = async (): Promise<LookupTimeSeries[]> => {
    const timeSeries: FetchedResource<LookupTimeSeries> = await fetchResource("timeseries", LookupTimeSeriesModel);

    await persistData(timeSeries, LookupTimeSeriesModel, "id");

    return timeSeries.data;
}