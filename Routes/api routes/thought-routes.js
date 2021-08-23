const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')


router
    .route('/')
    .get(getAllThought)


router
    .route('/:userId')
    .post(createThought)


router
    .route('/:userId/:id')
    .get(getThoughtById)
    .delete(deleteThought)
    .put(updateThought)


router
    .route('/:userId/:id/reactions')
    .post(addReaction)
    .delete(deleteReaction)


module.exports = router;