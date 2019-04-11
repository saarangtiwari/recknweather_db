import * as mongoose from 'mongoose';
import UserIntf from '../interfaces/userIntf';

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true });

const userSchema = mongoose.Schema({
    name: String,
    password: String
});

const User = mongoose.model('user', userSchema);

export default class UserClass {
    public static addUser(userObject: UserIntf) {
        const user = new User(userObject);
        return new Promise((resolve, reject) => {
            user.save((error, usr) => {
                if (error) {
                    resolve('Error while saving user in Database ' + error);
                } else {
                    reject('saved user:  ' + usr);
                }
            });
        });
    }

    public static isAuthorized(userObject: UserIntf) {
        return new Promise((resolve, reject) => {
            User.find({ name: userObject.name, password: userObject.password }, 'name', (error, user: []) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(user)
                }
            });

        });
    }
}