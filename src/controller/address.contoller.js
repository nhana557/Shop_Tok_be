import { v4 as uuidv4 } from 'uuid'
import modelsAddress from '../models/address.js'
import commonHelper from '../helper/common.js'


const controllersAddress = {
    create: async (req, res, next) => {
        try {
            const id_user = req.decoded.id
            const { address } = req.body
            const data = {
                id: uuidv4(),
                address,
                user_id: id_user
            }
            await modelsAddress.insert(data)
            commonHelper(res, data, 200, 'success add address')

        } catch (error) {
            console.log(error)
        }
    },
    updateAddress: async (req, res, next) => {
        try {
            const id_user = req.decoded.id
            const { address } = req.body
            const data = {
                address,
                user_id: id_user
            }
            await modelsAddress.update(data)
            commonHelper(res, data, 200, 'success update address')

        } catch (error) {
            console.log(error)
        }
    },
    getAddressUser: async (req, res, next) => {
        try {
            const user_id = req.decoded.id
            const result = await modelsAddress.getAddress(user_id)
            commonHelper(res, result.rows, 200, 'success get Address')
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default controllersAddress;