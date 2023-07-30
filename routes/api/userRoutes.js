const router = require('express').Router()
const {
    getAllUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
    addFriendToUser,
    delFriendFromUser
} = require('../../controllers/userController')

// Queries for getting and adding users
router.route('/')
    .get(getAllUsers)
    .post(addUser)

// Queries for operations on single users
router.route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser)

//Queries for adding and removing friends from users
router.route('/:userId/friends/:friendId')
    .post(addFriendToUser)
    .delete(delFriendFromUser)

module.exports = router

