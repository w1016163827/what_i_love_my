const User = require('../models/mongoose/user')
const HTTPRequestParamError = require('../errors/http_errors/http_request_param_error')
const JWT = require('jsonwebtoken')
const JWTConfig = require('../crypto/JWT_config')

async function addNewUser(user) {
    if (!user || !user.userName ||
        !user.password || !user.name) {
        throw new HTTPRequestParamError(
            'user', '用户名或密码不能为空',
            'empty username or password',
        );
    }
    const created = await User.createByNamePWD(user)
    const token = JWT.sign({_id:created._id},JWTConfig.privateKey,{expiresIn:'2 days'})
    return {
        created,
        token
    }
}
async function getAllUser() {
    const users = await User.list()
    return users
}

async function loginWithUserPWD(userName,password) {
    if (!userName || !password) {
        throw new HTTPRequestParamError(
            'user', '用户名或密码不能为空',
            'empty username or password',
        );
    }
    const found = await User.getUserByNamePass({userName,password})
    if(!found){
        throw new HTTPRequestParamError(`userName`,`用户名或密码错误`,`error userName or password`)
    }
    const token = JWT.sign({_id:found._id},JWTConfig.privateKey,{expiresIn:'2 days'})
    return {
        user:found,
        token
    }
}
async function getUserById(userId) {
    const user = await User.getOneById(userId);
    return user;
}
module.exports = {
    addNewUser,
    loginWithUserPWD,
    getUserById,
    getAllUser
}