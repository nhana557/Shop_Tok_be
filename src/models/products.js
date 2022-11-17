const Pool = require('../config/db')
const selectAll = ({limit,offset,sort,sortby, querySearch}) => {
  return Pool.query(`SELECT * FROM product ${querySearch} ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const searching = (search) =>{
  return Pool.query( "SELECT * FROM product WHERE name ILIKE $1", [`%${search}%`] );
};
const select = (id) => {
  return Pool.query(`SELECT * FROM product WHERE id='${id}'`)
}
const insert = (data) => {
  const { id, name, stock, price, category_id, merk, transaksi_id, photo, description } = data
  return Pool.query(`INSERT INTO product(id, name,  stock, price, category_id, transaksi_id,  description, photo, merk) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [id, name, stock, price, category_id, transaksi_id, description, photo, merk])
}
const update = (data) => {
  const { id,name,stock,price,category_id, transaksi_id, photo,description, merk} = data
  return Pool.query(`UPDATE product SET name=$1, stock=$2, price=$3, photo=$4 ,description=$5, category_id=$6, transaksi_id=$7,
  merk=$8  WHERE id=$9`, [name, stock, price, photo, description, category_id, transaksi_id, merk, id])
}
const deleteData = (id) => {
  return Pool.query(`DELETE FROM product WHERE id=${id}`)
}

const countData = () =>{
  return Pool.query('SELECT COUNT(*) FROM product')
}

const findId =(id)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT * FROM product WHERE id=${id}`,(error,result)=>{
    if(!error){
      resolve(result)
    }else{
      reject(error)
    }
  })
  )
}

module.exports = {
  selectAll,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId,
  searching
}
