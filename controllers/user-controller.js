const { User } = require('../Models')


const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => {
                console.log(dbUserData)
                res.json(dbUserData);
            })
            .catch(err => {
                res.json(err);
            });
    },


    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'Thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log('Cant find user with corresponding ID', err)
                res.status(404)
            })
    },


    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(err).json('Error creating user!'))
    },


    UpdateUser({ params, body }, res) {
        User.findByIdAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with corresponding ID' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err).json('Error updating user!'))
    },


    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(err).json('Error deleting user!'))
    }
}

module.exports = userController;