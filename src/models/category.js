import Pool from '../config/db.js';

export const AllCategory = () => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM category`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
  // return Pool.query(`SELECT * FROM category ${querySearch} ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

export const selectAll = ({ limit, offset, sort, sortby, querySearch }) => {
  return Pool.query(`SELECT product.id, product.name , product.price, product.stock, product.description,
  product.merk, product.photo, product.condition, category.name AS categori, toko.name AS toko
  FROM product ${querySearch} ORDER BY product.name ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

export const searching = (search) => {
  return Pool.query("SELECT * FROM category WHERE name ILIKE $1", [`%${search}%`]);
};
export const select = (id) => {
  return Pool.query(`SELECT * FROM category WHERE id='${id}'`)
}
export const insert = (id, name) => {
  return Pool.query(`INSERT INTO category(id,name) VALUES ('${id}','${name}')`)
}
export const update = (id, name) => {
  return Pool.query(`UPDATE category SET name='${name}' WHERE id='${id}'`)
}
export const deleteData = (id) => {
  return Pool.query(`DELETE FROM category WHERE id='${id}'`)
}

export const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM category')
}

export const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM category WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}
