import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import {
  findEmail,
  create,
  selectAllUsers,
  activateEmail,
  findByToken,
  updateImgProfile
} from '../models/users.js'
import commonHelper from '../helper/common.js';
import authHelper from '../helper/auth.js';
import sendEmail from '../utils/email/sendEmail.js'
import modelStore from "../models/store.js"
import deleteFile from '../utils/delete.js'
import { uploadGoogleDrive } from "../utils/uploadGoogleDrive.js"
import deleteDrive from "../utils/deleteDrive.js"

const UserController = {
  register: async (req, res, next) => {
    try {
      const { email, password, fullname, role, StoreName } = req.body;
      const { rowCount } = await findEmail(email)
      const salt = bcrypt.genSaltSync(10)
      const passwordHash = bcrypt.hashSync(password, salt);
      const id = uuidv4()
      const token = crypto.randomBytes(30).toString('hex')
      // const token = true

      if (rowCount) {
        return next(createError(403, "Email is already used"))
      }
      const data = {
        id,
        email,
        passwordHash,
        fullname,
        role: role || 'buyer',
        verify: token,
      }
      if (data.role === 'seller') {
        console.log('test')
        const dataStore = {
          id: uuidv4(),
          name: StoreName,
          email,
          user_id: id,
          description: null,
          phonenumber: null
        }
        await modelStore.insert(dataStore)

      }

      await create(data)
      sendEmail({ email, fullname, token })
      // commonHelper(res, null, 201, "Success register", null)
      commonHelper(res, null, 201, "Success register please check Email to activate account", null)

    } catch (error) {
      res.status(500).json(error)
    }
  },

  ActivateAccount: async (req, res, next) => {
    try {
      const { token } = req.params
      console.log(token)
      const user = await findByToken('verify', token)

      if (!user.rowCount) {
        res.send(
          `<div>
            <h1>Activation Failed </h1>
            <h3>Token invalid </h3> 
          </div>`
        )
        return;
      }

      console.log(user.rows[0].id)
      await activateEmail(user.rows[0].id)
      res.send(
        `<div>
            <h1>Activation Success </h1>
            <a href='${process.env.API_FRONTEND}/Login'><button class="btn btn-primary">Login</button></a> 
          </div>`
      )
    } catch (error) {
      res.status(500).json(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const { rows: [user] } = await findEmail(email)
      if (!user) {
        return commonHelper(res, null, 403, 'Email is invalid')
      } else if (user.verify === 'true') {
        const isValidPassword = bcrypt.compareSync(password, user.password)
        console.log(isValidPassword);

        if (!isValidPassword) {
          return commonHelper(res, null, 403, 'Password is invalid')
        }
        delete user.password
        const payload = {
          email: user.email,
          role: user.role,
          id: user.id
        }
        user.token = authHelper.generateToken(payload)
        user.refreshToken = authHelper.generateRefreshToken(payload)

        commonHelper(res, user, 201, 'login is success')
      }
      if (user.verify !== 'true') return commonHelper(res, null, 403, 'please activation Account!')

    } catch (error) {
      res.status(500).json(error)
    }
  },

  selectAll: (req, res, next) => {
    selectAllUsers()
      .then(result =>
        commonHelper(res, result.rows, 200, "get data success"))
      .catch(err => res.send(err))
  },

  profile: async (req, res, next) => {
    const email = req.decoded.email
    const { rows: [user] } = await findEmail(email)
    delete user.password
    commonHelper(res, user, 200)
  },

  refreshToken: (req, res, next) => {
    const refreshToken = req.body.refreshToken
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT)
    const payload = {
      email: decoded.email,
      role: decoded.role
    }
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload)
    }
    commonHelper(res, result, 200, "RefreshToken success", null)
  },
  updatePhotoProfile: async (req, res, next) => {
    try {
      const email = req.decoded.email;
      const id = req.decoded.id
      const { phonenumber, gender, fullname } = req.body
      const user = await findEmail(email)
      if (!user.rowCount) {
        if (req.files) {
          deleteFile(req.files.image[0].path)
        }
        commonHelper(res, null, 404, "Update profile failed")
        return;
      }

      let { image } = user.rows[0];

      if (req.files) {
        if (req.files.image) {
          if (user.rows[0].image) {
            let id_drive = user.rows[0].image.split('id=')[1]
            console.log(id_drive)
            await deleteDrive(id_drive)
          }
          console.log(req.files.image)
          image = await uploadGoogleDrive(req.files.image[0])
          deleteFile(req.files.image[0].path)
        }
      }
      const data = {
        id,
        fullname,
        phonenumber,
        gender,
        image: image.id ? `https://drive.google.com/uc?export=view&id=${image.id}` : null
      }
      await updateImgProfile(data)
      commonHelper(res, null, 200, "updated Photo")
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}

export default UserController
