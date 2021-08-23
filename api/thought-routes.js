const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)

router
    .route('/:userId')
    .post(addThought)

router
    .route('userId/:id')
    .delete(removeThought)
    
router
    .route('/:thoughtId/reactions')
    .put(addReaction)
    .delete(removeReaction)

module.exports = router;