const { User } = require('../models');

const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },
        // GET user by _id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'Friends',
                select: '-__v'
            })
            .populate({
                path: 'Thought',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },
        // POST to create new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    // PUT to update a user by its _id
    updateUser({params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // DELETE to remove user by _id
    deleteUser({params}, res) {
        User.findByIdAndDelete({_id: params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    addFriend({params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId}, body, {
            $push: {
                friends: params.friendId
            }
        }, { new: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
}

module.exports = userController;