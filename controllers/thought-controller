const { Thought, User } = require('../models');

const thoughtController = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then(dbThought => {
                res.json(dbThought);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    // GET to get a single thought by its _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThought => {
                res.json(dbThought);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    // POST to create a new thought 
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findByIdAndUpdate(
                    params.userId,
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                )
            })
            .then(dbUserThought => {
                if (!dbUserThought) {
                    res.status(404).json({ message: 'No user with this ID' });
                    return;
                }
                res.json(dbUserThought);
            })
            .catch(err => res.json(err));
    },
    // PUT to update thought by _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThought => {
                res.json(dbThought);
            })
            .catch(err => { 
                res.json(err);
            });
    },
    // DELETE to remove a thought by its _id
    removeThought({ params }, res) {
        Thought.findByIdAndDelete(params.id)
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'no thought with this id' });
                    return;
                }
                return User.findByIdAndUpdate(
                    params.userId,
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'no user with this id' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },
    //   POST to create a reaction
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'no thought with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.json(err)
            });
    },
    // DELETE to pull and remove a reaction by the reaction ID
    removeReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'no thought with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;