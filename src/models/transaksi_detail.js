const Pool = require("../config/db");

const transaksiDetail = () =>{
    return Pool.query("SELECT * FROM transaksi_detail");
};
const insert = (id, total, payment_id) =>{
    return Pool.query(`INSERT INTO transaksi_detail VALUES('${id}', '${total}', ${payment_id})`);
};
const update = (id, total, payment_id) =>{
    return Pool.query(`UPDATE transaksi_detail SET total=${total}, payment_id=${payment_id} WHERE id='${id}'`);
};
const deleted = (id) =>{
    return Pool.query(`DELETE FROM transaksi_detail WHERE id='${id}'`);
};

module.exports = {transaksiDetail, insert, update, deleted};