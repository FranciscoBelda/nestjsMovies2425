import {Schema} from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";

export const UserSchema: Schema<any> =
    new Schema({
        username: {type: String, unique: true, required: true},
        avatar: String,
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
    });
UserSchema.plugin(uniqueValidator,
    {message: 'Email is already in use'});

