import * as mongoose from "mongoose";
import {Schema} from "mongoose";

let userSchema = new mongoose.Schema({

    pseudo : {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    info : String,
    address: String,
    password: {
        type: String,
        required: true
    }

});

let userModel = mongoose.model('User',userSchema);
export default userModel;