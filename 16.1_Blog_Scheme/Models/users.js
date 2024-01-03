import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 2,
        maxLength: 15
    },
    address: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowerCae: true,
        validate: {
            validator: function(value){
                const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 

                return emailRegex.test(value)
            },
            message: 'invalid email address'
        }
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User