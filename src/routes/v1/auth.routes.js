import express from 'express'
import UserController from '../../controller/auth.controller.js'
import { protect } from '../../middlewares/auth.js'
import upload from '../../middlewares/upload.js'

const router = express.Router()
const {
    register,
    login,
    profile,
    refreshToken,
    selectAll,
    ActivateAccount,
    updatePhotoProfile
} = UserController

router
    .post('/register', register)
    .post('/login', login)
    .get('/activate/:token', ActivateAccount)
    .post('/refersh-token', refreshToken)
    .get('/profile', protect, profile)
    // .put('/update',protect, upload, updatePhotoProfile)
    .put('/updateImg', protect, upload, updatePhotoProfile)
    .get('/', selectAll)


export default router