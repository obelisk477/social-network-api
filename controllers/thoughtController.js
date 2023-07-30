const { ObjectId } = require('mongoose').Types
const { Thought, User } = require('../models')



module.exports = {
    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v')

            res.json(thoughts)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)

        }
    },

    // Get single thought
    async getSingleThought(req, res) {
        try {
            let thought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v')

            if (!thought) {
                return res.status(400).json({message: 'No thought with that ID'})
            }

            res.status(200).json(thought)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Add thought for a given username in req.body
    async addThought(req, res) {
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
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Update thought with data in req.body based on thoughtId in params
    async updateThought(req, res) {
        try {
            
            let compareThought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v')

            // Checks if you are trying to update the username, and stops you if you are, as this functions as a primary key
            if (req.body.username && compareThought.username != req.body.username) {
                return res.status(500).json({message: 'Cannot update the username property of a thought'})
            }

            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {
                    new:true
                },
            ).select('-__v')

            if (!thought) {
                console.log(thought)
                res.status(404).json({ message: 'No thought with this id!' });
              }
        
              res.json(thought);


        } catch (err) {
            console.log(err)
            res.status(500).json(err)

        }
    },

    // Delete thought by param :thoughtId in route
    async deleteThought(req, res) {
        try {

            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId}).select('-__v')

            const user = await User.findOneAndUpdate(
                {username: thought.username},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true},
            ).select('-__v')

            if (!thought) {
                return res.status(404).json({message: 'No thought found with this ID'})
            }

            // If no user found, deletes thought but returns a message that no user was found
            if (!user) {
                return res.status(404).json({message: 'Thought deleted, but was not associated with a user'})
            }


            res.status(200).json({message: 'Thought deleted & removed from user'})

        } catch (err) {
            console.log(err)
            res.status(500).json(err)

        }
    },

    // Adds a reaction to an existing thought
    async addReactionToThought(req, res) {
        try {

            // Checks if username being submitted exists in user collection
            const reactingUser = await User.findOne({username: req.body.username})

            if (!reactingUser) {
                return res.status(404).json({message: 'No user found with this username'})
            }
            
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {new: true},
            ).select('-__v')
            
            if (!thought) {
                return res.status(404).json({message: 'No thought found with this ID'})
            }
        
            res.status(200).json({thought})

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Deletes a reaction from a thought based on :thoughtId in params
    async delReactionFromThought(req, res) {
        try {

            let oldThoughtData = await Thought.findOne({
                _id: req.params.thoughtId
            }).select('-__v')
            
            // Gets entire reaction object to delete
            const reactionToDel = oldThoughtData.reactions
                .filter((item) => item.reactionId == req.body.reactionId)

            console.log(reactionToDel)

            // Pulls entire reaction object from reaction field
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: reactionToDel[0]}},
                {new: true},
            ).select('-__v')

            console.log(thought.reactionCount)

            if (!thought) {
                return res.status(404).json({message: 'No thought found with this ID'})
            }

            if (oldThoughtData.reactionCount == thought.reactionCount) {
                return res.status(404).json('No reaction found with this reaction ID')
            }

            res.status(200).json(thought)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}