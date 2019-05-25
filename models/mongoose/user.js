const mongoose = require('mongoose')
const HTTPRequestParamError = require('../../errors/http_errors/http_request_param_error')
const pdkbf2Async = require('bluebird').promisify(require('crypto').pbkdf2)
const {salt,iterations,keyLen,digest} = require('../../crypto/password_config')

const {Schema,model} = mongoose
const pwdProjection = {password:0}
const onlyId = {_id:1}

const userSchema = new Schema({
    name:{type:String,required:true,index:1},
    age:{type:Number,min:0,max:120},
    userName:{type:String,required:true,unique:true},
    password:String
})

const userModel = model('user',userSchema)

async function insert(user) {
    const created = await userModel.create(user)
    return {
        _id: created._id,
        userName: created.username,
        name: created.name,
    }
}
async function list(param) {
    let match = {}
    if(param){
        match = param
    }
    const res = await userModel.find(match,pwdProjection)
    return res
}
async function getOneById(id) {
    const user = await userModel.findOne({_id:id},pwdProjection)
    return user
}
async function getOneByName(name) {
    const user = await userModel.findOne({name},pwdProjection)
    return user
}
async function createByNamePWD(user) {
    const {name,password,userName} = user
    const userDup = await userModel.findOne({
        $or:[
            {userName},
            {name}
        ]
    },onlyId)
    if(userDup){
        throw new HTTPRequestParamError(`userName`,`该用户名或名称已被注册，请再找一个吧`,`userName or name duplicate`)
    }
    const passwordToSave = await pdkbf2Async(password,salt,iterations,keyLen,digest)

    const created = await insert({
        name,
        password:passwordToSave,
        userName,
    })

    return created
}
async function getUserByNamePass(user) {
    const {userName,password} = user
    const passwordToFind = await pdkbf2Async(password,salt,iterations,keyLen,digest)
    const found = await userModel.findOne({
        userName,
        passwordToFind
    },pwdProjection)
    return found
}

module.exports = {
    insert,
    getOneById,
    getOneByName,
    createByNamePWD,
    getUserByNamePass,
};













