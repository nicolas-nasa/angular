import mongoose , { Schema } from "mongoose";
import User from "../interfaces/userInterface";

const UserSchema: Schema = new Schema ({
    name:{type: String, require: true},
    email:{type: String, require: true},
    password:{type: String, require: true},
    confirmed:{type: Boolean, require: true},
    confirmCode:{type: String, require: true},

},{

    timestamps: true

});

export default mongoose.model<User>('User',UserSchema);