const { Schema, Types, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true            
        },
        // Match regex is for email validation
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please use a valid email address'],    
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
          virtuals: true,
        },
        // Validate before keeps server from stalling out on re-validate during update queries
        validateBeforeSave: true,
        id: false,
      }

)


// Virtual returns length of friend array; functions as friend counter
userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('User', userSchema)

module.exports = User