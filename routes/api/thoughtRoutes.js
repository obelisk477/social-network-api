const router = require('express').Router()
const {
    getAllThoughts,
    getSingleThought,
    addThought,
    updateThought,
    deleteThought,
    addReactionToThought,
    delReactionFromThought
} = require('../../controllers/thoughtController')





module.exports = router