const { Schema, Types } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
        // Need getter method to format timestamp on query
    }
});

reactionSchema.virtual('formattedDate').get(function () {
    return this.createdAt.toDateString()
})


const thoughtSchema = new Schema(
    {
        prop1: {
            
        },
        prop2: {

        },
        reactions: [reactionSchema]
    },
    // {
    //     toJSON: {
    //         getters: true
    //     }
    // }
)

const Thought = model('thought', thoughtSchema)

module.exports = Thought