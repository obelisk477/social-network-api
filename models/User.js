const { Schema, Types } = require('mongoose')

const userSchema = new Schema(
    {
        prop1: {
            
        },
        prop2: {

        },
        prop3: {

        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const User = model('user', userSchema)

module.exports = User