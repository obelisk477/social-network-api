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
            console.log(err)
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {
            
            console.log('Updating user...')

            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {
                    runValidators: true,
                    new:true
                },
            )
            console.log(user)

            if (!user) {
                console.log(user)
                res.status(404).json({ message: 'No user with this id!' });
              }
        
              res.json(user);

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async deleteUser(req, res) {
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
            console.log(err)
            res.status(500).json(err)
        }
    },

    async addFriendToUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {new: true},
            )
            
            if (!user) {
                return res.status(404).json({message: 'No user found with this ID'})
            }

            const responseObj = {
                ...user._doc,
                friendCount: user.friendCount
            }
        
            res.status(200).json({responseObj})

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async delFriendFromUser(req, res) {
        try {

            let oldUserData = await User.findOne({
                _id: req.params.userId
            })
            
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {new: true},
            )

            if (!user) {
                return res.status(404).json({message: 'No user found with this ID'})
            }

            if (oldUserData.friendCount == user.friendCount) {
                return res.status(404).json('No friend found with this friend ID')
            }

            res.status(200).json(user)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}