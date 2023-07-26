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

router.route('/')
    .get(getAllUsers)
    .post(addUser)

router.route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser)

router.route('/:userId/friends/:friendId')
    .post(addFriendToUser)
    .delete(delFriendFromUser)

module.exports = router

