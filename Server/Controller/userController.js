const Users = require('../Model/userModel');

//Show the list of users
const fetchAllUsers = async (req, res, next) => {
    try {
       const response = await Users.find()

       res.json(response);
    } catch (error) {
        res.json({
            message: 'An error occured!'
        })
    }
};

const fetchSingleUser = async (req, res, next) => {
    const userId = req.body.userId
    try {
        const response = await Users.findById(userId);

        res.json(response);
    } catch (error) {
        res.json({
            message: 'An error occured',
        })
    }
}

const deleteUser = async (req, res, next) => {
    const {userId} = req.body
    try {
        const response = await Users.findOneAndDelete(userId);

        res.json({
            message: 'User Deleted successfully', 
            user: response
        });

    } catch (error) {
        res.json({
            message: 'An error occured'
        })
    }
};

const storeUserToDb = async (req, res, next) => {
    const {name, email} = req.body
    try {
        let user = new Users({
            name,
            email,
        });

        const response = await user.save();

        res.json({
            message: 'User Stored Successfully'
        })

    } catch (error) {
        res.json({
            message: 'An Error Occured',
        })
    };
};

const UpdateUser = async (req, res, next) => {
    try {
        let {userId, name, email} = req.body;

        let upadtedData = {
            name,
            email
        }

       const updateUserDetails = await Users.findByIdAndUpdate(userId, {$set: upadtedData});

       res.json({
        message: 'User updated successfuly',
        userData: updateUserDetails,
       })


    } catch (error) {
        res.json({
            message: 'An error occured!',
        })
    }
}

module.exports ={
    UpdateUser,
    fetchAllUsers,
    deleteUser,
    fetchSingleUser,
    storeUserToDb
}