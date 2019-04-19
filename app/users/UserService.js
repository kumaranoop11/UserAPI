const User = require('./UserModel');

export function getAllUsers(username) {
    return User.find({}).exec();    
}

export async function addUser(nUser) {
    let newUser = new User({
        firstName: nUser.firstName, 
        lastName: nUser.lastName, 
        email: nUser.email, 
        password:nUser.password, 
        phoneNumber: nUser.phoneNumber
    });
    let addedUser = await newUser.save();
    return addedUser;
}

export async function updateUser(uEmail, uUser) {
    let updatedUser = User.findOneAndUpdate({email: uEmail}, {$set:{
        email: uUser.email, 
        password: uUser.password,
        firstName: uUser.firstName,
        lastName: uUser.lastName,
        phoneNumber: uUser.phoneNumber
    }}, {new: true});
    return updatedUser;
}

export async function getUser(email) {
    return User.findOne({email: email});
}

export async function deleteUser(email) {
    let deletedUser = User.deleteOne({email: email});
    return deletedUser;
}