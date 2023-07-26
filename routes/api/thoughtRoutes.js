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


router.route('/')
    .get(getAllThoughts)
    .post(addThought)
router.route('/:thoughtId')
    .get(getSingleThought)
    .delete(deleteThought)
    .put(updateThought)

module.exports = router