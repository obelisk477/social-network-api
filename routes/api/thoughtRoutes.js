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

// Queries for getting and adding thoughts
router.route('/')
    .get(getAllThoughts)
    .post(addThought)

// Queries operating on a single thought
router.route('/:thoughtId')
    .get(getSingleThought)
    .delete(deleteThought)
    .put(updateThought)

// Queries for adding and removing reactions to thoughts
router.route('/:thoughtId/reactions')
    .post(addReactionToThought)
    .delete(delReactionFromThought)

module.exports = router