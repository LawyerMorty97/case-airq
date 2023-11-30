import { InferSchemaType, Schema } from "mongoose";
import { createModel } from "../../../utils/mongoose.util";

// Provides information regarding an area
const LookupAreaSchema = new Schema({
    zone: {
        type: String,
        required: true,
    },
    municipality: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
});
export type LookupArea = InferSchemaType<typeof LookupAreaSchema>;
export const LookupAreaModel = createModel("LookupArea", LookupAreaSchema);

// Provides information about a component
const LookupComponentSchema = new Schema({
    component: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    }
});
export type LookupComponent = InferSchemaType<typeof LookupComponentSchema>;
export const LookupComponentModel = createModel("LookupComponent", LookupComponentSchema);

// Provides information about a station
const LookupStationSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    zone: {
        type: String,
        required: true,
    },
    municipality: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    station: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    eoi: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    firstMeasurment: {
        type: Date,
        required: true,
    },
    lastMeasurment: {
        type: Date,
        required: true,
    },
    components: {
        type: String,
        required: true,
    },
    isVisible: {
        type: String,
        required: true,
    },
});
export type LookupStation = InferSchemaType<typeof LookupStationSchema>;
export const LookupStationModel = createModel("LookupStation", LookupStationSchema);

// Provides information regarding air quality index (per component)
const LookupStationAirQualityIndexMeasurementSchema = new Schema({
    index: {
        type: Number,
        required: true,
    },
    fromValue: {
        type: Number,
        required: true,
    },
    toValue: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    advice: {
        type: String,
        required: true,
    },
});

const LookupAirQualityIndexSchema = new Schema({
    component: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: false,
    },
    aqis: {
        type: [LookupStationAirQualityIndexMeasurementSchema],
        required: true,
    }
});
export type LookupAirQualityIndex = InferSchemaType<typeof LookupAirQualityIndexSchema>;
export const LookupAirQualityIndexModel = createModel("LookupAirQualityIndex", LookupAirQualityIndexSchema);

const LookupMeanTypeSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
});
export type LookupMeanType = InferSchemaType<typeof LookupMeanTypeSchema>;
export const LookupMeanTypeModel = createModel("LookupMeanType", LookupMeanTypeSchema);

const LookupTimeSeriesSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    zone: {
        type: String,
        required: true,
    },
    municipality: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    station: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    eoi: {
        type: String,
        required: false,
    },
    component: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    eea: {
        type: Boolean,
        required: true,
    },
    timestep: {
        type: Number,
        required: true,
    },
    timestepAsText: {
        type: String,
        required: true,
    },
    isVisible: {
        type: Boolean,
        required: true,
    },
    fromTime: {
        type: String,
        required: true,
    },
    toTime: {
        type: Date,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
});
export type LookupTimeSeries = InferSchemaType<typeof LookupTimeSeriesSchema>;
export const LookupTimeSeriesModel = createModel("LookupTimeSeries", LookupTimeSeriesSchema);