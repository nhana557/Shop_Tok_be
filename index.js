import express from 'express'
import createError from 'http-errors'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import Router from './src/routes/index.js';
import dotenv from 'dotenv'

dotenv.config()


const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
  origin: "*"
}))
app.use(helmet())
app.use(morgan('dev'))

app.use('/api/v1', Router)
app.use('/img', express.static('./src/upload'))


app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})
app.use((err, req, res, next) => {
  const messageError = err.message || "internal server error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messageError
  })

})


const PORT = process.env.PORT || 5000
const DB_HOST = process.env.DB_HOS || 'localhost'
app.listen(PORT, () => {
  console.log(`server running on http://${DB_HOST}:${PORT}`)
})
