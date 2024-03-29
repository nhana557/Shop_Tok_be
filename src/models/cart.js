import Pool from "../config/db.js";

const cartModel = {
    transaksiDetail: (user_id) => {
        return Pool.query("SELECT product.name AS name, product.photo AS image, product.merk AS Merk, product.price as price, cart.product_id as id, cart.qty as qty FROM cart LEFT JOIN product ON product.id = cart.product_id WHERE user_id = $1", [user_id]);
    },
    insert: ({ id, product_id, user_id, qty }) => {
        return Pool.query(`INSERT INTO cart(id, product_id, user_id, qty) VALUES($1, $2, $3, $4)`, [id, product_id, user_id, qty]);
    },

    selectQty: (id) => {
        return Pool.query(`select qty from cart where product_id = $1`, [id])
    },
    update: (id, add) => {
        return Pool.query(`UPDATE cart SET qty = $1  WHERE product_id=$2`, [add, id]);
    },
    deleted: (id) => {
        return Pool.query(`DELETE FROM cart WHERE product_id = $1`, [id]);
    },

}

export default cartModel;