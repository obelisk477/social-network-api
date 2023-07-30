const { Schema, Types, model } = require('mongoose')

// Reaction schema for the reactions field in Thought model
// Reaction will not be a model itself
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
        default: Date.now,
        get: formatDate
    }
    },
    {
        toJSON: {
            getters: true
          },
        _id: false,
    });

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false,
    }
)

// Helper function for thought & reaction getters
function formatDate(date) {
    return date.toDateString()
}

// Virtual to get reaction array length on query of thoughts
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema )

module.exports = Thought, thoughtSchema