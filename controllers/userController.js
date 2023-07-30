const { ObjectId } = require('mongoose').Types
const { Thought, User } = require('../models')


module.exports = {

    // Get all users from collection
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v')
                .populate('friends')


            res.json(users)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Get single user by :userId in params
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
                .select('-__v')
                .populate('friends')

            if (!user) {
                return res.status(404).json({message: 'No user with that ID'})
            }

            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },

    // Add user to collection from info in req.body
    async addUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json({ user } )
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Update user in collection by :userId param & with info in req.body
    async updateUser(req, res) {
        try {
            
            console.log('Updating user...')

            // Make sure to re-run validators on email field during update
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {
                    runValidators: true,
                    new:true
                },
            ).select('-__v')
            console.log(user)

            if (!user) {
                console.log(user)
                return res.status(404).json({ message: 'No user with this id!' });
              }
        
              res.json(user);

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Delete user by :userId param
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId}).select('-__v')

            if(!user) {
                return res.status(404).json({message: 'No such user exists'})
            }

            // If user deletion successful, delete thoughts assoicated iwth user
            const thoughtsToRemove = await Thought.deleteMany({username: user.username}).select('-__v')

            // Message that no thoughts were found if no thoughts found on user
            if(thoughtsToRemove.deletedCount == 0) {
                return res.status(404).json({message: 'User deleted, but no thoughts found'})
            }

            res.status(200).json({message: 'User & associated thoughts deleted'})

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Add friend to user's friends field by :friendId in params
    async addFriendToUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {new: true},
            ).select('-__v')
            
            if (!user) {
                return res.status(404).json({message: 'No user found with this ID'})
            }
        
            res.status(200).json({user})

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // Delete friend from user by :friendId in params
    async delFriendFromUser(req, res) {
        try {

            let oldUserData = await User.findOne({
                _id: req.params.userId
            }).select('-__v')
            
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {new: true},
            ).select('-__v')

            if (!user) {
                return res.status(404).json({message: 'No user found with this ID'})
            }

            // Inform in response that friend not found / deleted if friend count unchanged
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