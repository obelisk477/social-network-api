const { ObjectId } = require('mongoose').Types
const { Thought, User } = require('../models')

// Aggregate functions go here

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find()

            res.json(thoughts)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)

        }
    },

    async getSingleThought(req, res) {
        try {
            let thought = await Thought.findOne({_id: req.params.thoughtId})

            if (!thought) {
                res.status(400).json({message: 'No thought with that ID'})
            }

            res.status(200).json(thought)

        } catch (err) {
            
        }
    },

    async addThought(req, res) {
        // Don't forget to push created thoughts to the associated user's thoughts array field
        try {
            const thought = await Thought.create(req.body)
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id}},
                {new: true},
            )

            if (!user) {
                return res.status(404).json({message: 'Thought created, but found no user with that username'})
            }

            res.json('Thought created and associated with user')
        } catch (err) {
            
        }
    },

    async updateThought(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async deleteThought(req, res) {
        try {

            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId})

            const user = await User.findOneAndUpdate(
                {username: thought.username},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true},
            )

            if (!thought) {
                return res.status(404).json({message: 'No thought found with this ID'})
            }

            if (!user) {
                return res.status(404).json({message: 'thought'})
            }


            res.status(200).json({message: 'Thought deleted & removed from user'})

        } catch (err) {
            
        }
    },

    async addReactionToThought(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async delReactionFromThought(req, res) {
        try {

        } catch (err) {
            
        }
    }
}