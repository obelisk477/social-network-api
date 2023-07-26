const { ObjectId } = require('mongoose').Types
const { Thought, User } = require('../models')

// Aggregate functions go here

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find()

            res.json(users)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)

        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
                .select('-__v')

            if (!user) {
                return res.status(404).json({message: 'No user with that ID'})
            }

            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },

    async addUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json({ user } )
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async deleteUser(req, res) {
        // Bonus is to remove users associated thoughts when deleted
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId})


            if(!user) {
                return res.status(404).json({message: 'No such user exists'})
            }

            const thoughtsToRemove = await Thought.deleteMany({username: user.username})

            if(thoughtsToRemove.deletedCount == 0) {
                return res.status(404).json({message: 'User deleted, but no thoughts found'})
            }

            res.status(200).json({message: 'User & associated thoughts deleted'})

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async addFriendToUser(req, res) {
        try {

        } catch (err) {
            
        }
    },

    async delFriendFromUser(req, res) {
        try {

        } catch (err) {
            
        }
    }
}