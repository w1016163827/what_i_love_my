const express = require('express')
const {addNewUser,getAllUser,getUserById} = require('../services/user_service')
const apiRes = require('../utils/api_response')
const logger = require('../utils/loggers/logger')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', (req, res, next) => {
    (async () => {
        const result = await getAllUser()
        return result
    })()
        .then((r) => {
            res.data = r
            apiRes(req,res)
        })
        .catch((e) => {
            next(e)
        })
})
router.post('/', (req, res, next) => {
    (async () => {
        const {userName, password, name} = req.body
        const result = await addNewUser({userName, password, name})
        return result
    })()
        .then((r) => {
            res.data = r
            apiRes(req, res)
        })
        .catch((e) => {
            next(e)
        })
})
router.get('/:userId', (req, res, next) => {
    (async () => {
        const {userId} = req.params
        const result = await getUserById(userId)
        return result
    })()
        .then((r) => {
            res.data = r
            apiRes(req,res)
        })
        .catch((e) => {
            next(e)
        })
})
router.use(auth())

router.post('/:userId/subscription',(req,res,next)=>{
    res.send('拥有权限')
})
router.get('/:userId/subContent', (req, res, next) => {
    res.send('拥有权限')
});

module.exports = router


