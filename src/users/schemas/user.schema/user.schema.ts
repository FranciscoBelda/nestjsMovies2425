import {Schema} from "mongoose";

export const UserSchema: Schema<any> =
    new Schema({
        username: {type: String, unique: true, required: true},
        avatar: String,
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
    }, {versionKey: false});


