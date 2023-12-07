import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
         required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    avatar:{
        type:String,
        default:"https://i.pinimg.com/736x/15/c1/ec/15c1ec0f3beb08c3587d65462fd0fc7a.jpg"
    }
},
    { timestamps: true })


const User = mongoose.model('User', userSchema)

export default User;