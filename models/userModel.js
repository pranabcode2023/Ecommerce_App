import moongoose from "moongoose";



const userSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true, // must have name
        trim: true, // to remove white space
    },
    email: {
        type: String,
        required: true, // must have email
        unique: true,   // one email one user
    },

    password: {
        type: String,
        required: true
    },


    phone: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    role: {   // it can possible  with Boolean or Number/ i used number
        type: Number,
        default: 0   // 0 means false/ 1 means true
    }

}, { timestamps: true });  // timestams created time added for new user


export default moongoose.model('users', userSchema)