const UserService = require('./UserService');

export async function getAllUsers() {
    const users = await UserService.getAllUsers();
    return users;
}

export async function addUser(newUser) {
    const user = await UserService.addUser(newUser);
    return user;
}

export async function updateUser(email, uUser) {
    const updatedUser = await UserService.updateUser(email, uUser);
    return updatedUser;
}

export async function getUser(email) {
    const user = await UserService.getUser(email);
    return user;
}

export async function deleteUser(email) {
    const user = await UserService.deleteUser(email);
    return user;
}