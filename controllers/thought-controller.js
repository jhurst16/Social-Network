//-- /api/thoughts
const {
    Thought,
    User
} = require('../model')


const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .then(dbThoughtData => {
                res.json(dbThoughtData)
            })
            .catch(err => {
                res.json(err);
            });
    },


    getThoughtById({ params }, res) {
        Thought.findById({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with corresponding ID' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log('No thought with corresponding ID', err)
                res.status(404)
            })
    },


    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findByIdAndUpdate(
                    params.userId,
                    { $addToSet: { thoughts: _id } },
                    {
                        new: true,
                        runValidators: true
                    }
                )
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No User with corresponding ID' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json(err)
            })
    },

    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.id,
            body,
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with corresponding ID' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err)
                res.status(404).json(err)
            })
    },

    deleteThought({ params }, res) {
        Thought.findByIdAndDelete(params.id)
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No Thought with corresponding ID'
                    })
                    return;
                }
                return User.findByIdAndUpdate(
                    params.userId, {
                    $pull: {
                        thoughts: params.thoughtId
                    }
                }, {
                    new: true
                }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user with correspondig ID'
                    })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(params.thoughtId,
            { $push: { reactions: body } },
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with corresponding ID' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },


    deleteReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(params.thoughtId,
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction with corresponding ID!' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController;