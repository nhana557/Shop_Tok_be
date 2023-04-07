import Pool from '../config/db.js';

export const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

export const findByToken = (by, token) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM users WHERE ${by}= $1`, [token], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

export const activateEmail = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`UPDATE users SET verify=true WHERE id = $1`, [id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

export const selectAllUsers = () => {
  return Pool.query(`SELECT * FROM users`)
}

export const create = (data) => {
  const { id, email, passwordHash, fullname, role, verify, id_toko } = data
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users(id, email, password, fullname, role, verify, id_toko) VALUES($1, $2, $3, $4, $5, $6, $7)`, [id, email, passwordHash, fullname, role, verify, id_toko], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

export const updateImgProfile = ({ phonenumber, image, gender, fullname, id }) => {
  return new Promise((resolve, reject) => {
    Pool.query(`UPDATE users SET image=$1, fullname = $2, phonenumber = $3, gender=$4 WHERE id=$5`, [image, fullname, phonenumber, gender, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}
