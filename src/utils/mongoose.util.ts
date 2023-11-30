import { model, Schema } from "mongoose";

export const createModel = (name: string, schema: Schema) => {
    // Don't include `_id` and `__v` and virtuals when
    // transforming schema records to JSON.
    schema.set("toJSON", {
        virtuals: false,
        transform: (doc, record) => {
            delete record._id, record.__v;
        },
    });

    return model(name, schema);
}