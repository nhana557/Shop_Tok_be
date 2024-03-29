import Pool from "../config/db.js";

const TransaksiModel = {
    selectAll: (numberPerPage, startPages, sort, sortby) => {
        return Pool.query(`SELECT * FROM transaksi ORDER BY ${sortby} ${sort} LIMIT ${numberPerPage} OFFSET ${startPages}`);
    },

    select: (id) => {
        return Pool.query(`SELECT * FROM transakasi WHERE id=${id}`);
    },

    All: () => {
        return Pool.query(`SELECT * FROM transaksi`)
    },
    countTransaksi: () => {
        return Pool.query("SELECT COUNT(*) FROM transaksi");
    },

    insert: ({ id, transaksi_status, shipping_price, total_price, id_user, id_product, quantity, paymen }) => {
        return new Promise((resolve, reject) => {
            Pool.query(`INSERT INTO transaksi (id, transaksi_status, shipping_price, total_price, id_user, id_product, quantity, payment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [id, transaksi_status, shipping_price, total_price, id_user, id_product, quantity, paymen], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        });
    },

    update: ({
        id, transaksi_status, shipping_price, total_price, id_user, id_product, quantity, paymen
    }) => {
        return Pool.query(`UPDATE transaksi SET transaksi_status = $1, shipping_price = $2, total_price = $3, id_user = $4, id_product=$5, quantity = $6, payment = $7 WHERE id=$8`, [transaksi_status, shipping_price, total_price, id_user, id_product, quantity, paymen, id]);
    },

    deleteTransaksi: (id) => {
        return Pool.query(`DELETE FROM transaksi WHERE id=${id}`);
    },
}

export default TransaksiModel;