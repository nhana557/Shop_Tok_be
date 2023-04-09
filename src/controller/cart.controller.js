import { v4 as uuid4 } from "uuid";
import response from '../helper/common.js';
import cartModel from "../models/cart.js";

const cartControllers = {
    allCart: (req, res, next) => {
        const { id } = req.decoded
        cartModel.transaksiDetail(id)
            .then(result => {
                // console.log(result)
                res.json(result.rows)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            });
    },
    insert: async (req, res) => {
        try {
            const { product_id, user_id } = req.body;
            const data = {
                id: uuid4(),
                product_id,
                user_id,
                qty: 1
            }
            const newCart = await cartModel.insert(data)
            if (!newCart) {
                res.status(403).json({
                    msg: "add cart failed"
                })
            }
            res.status(200).json(newCart)

        } catch (error) {
            res.status(500).json(error)
        }
    },
    add: async (req, res) => {
        try {
            const id = req.params.id;
            // console.log(id)
            const qty = await cartModel.selectQty(id)
            // console.log(qty.rows)

            let add = Number(qty.rows[0].qty) + 1
            // const { qty } = req.body;
            cartModel.update(id, add)
                .then(res.json("add qty"))

        } catch (error) {
            console.log(error)
            res.status(500).json(error)

        }
    },
    min: async (req, res) => {
        try {
            const id = req.params.id;
            const qty = await cartModel.selectQty(id);

            let add = Number(qty.rows[0].qty) - 1
            console.log(add)
            if (add > 0) {
                cartModel.update(id, add)
                    .then(res.json("add qty"))
            } else {
                response(res, null, 200, 'minimal buying 1 qty')
            }

        } catch (error) {
            console.log(error)
            res.status(500).json(error)

        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await cartModel.deleted(id)
            response(res, result, 200, 'deleted')
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
};

export default cartControllers;