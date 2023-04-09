import commonHelper from "../helper/common.js";
import modelStore from "../models/store.js";
import deleteDrive from "../utils/deleteDrive.js";
import {
    uploadGoogleDrive
} from "../utils/uploadGoogleDrive.js";


const storeController = {
    getStore: async (req, res, next) => {
        try {
            const toko = await modelStore.getAll()
            commonHelper(res, toko, 200, "success")
        } catch (error) {
            next(error)
        }
    },
    getStoreById: async (req, res, next) => {
        try {
            const user_id = req.params.id;
            console.log(user_id)
            const result = await modelStore.getById(user_id)
            console.log(result)
            if (!result.rowCount) return commonHelper(res, null, 401, 'id not found')
            commonHelper(res, result.rows, 200, 'succces get data')
        } catch (error) {
            next(error)
        }
    },
    updateStore: async (req, res, next) => {
        try {
            const id = req.params.id
            const toko = await modelStore.getById(id)
            // if(!result.rowCount) return commonHelper(res, null, 401, 'id not found')
            const { name, phonenumber, description, email } = req.body;
            const photo = req.files.image[0]
            console.log(photo)
            let filePhoto = toko.rows[0].photo;
            if (photo) {
                if (toko.rows[0].photo) {
                    const id_drive = toko.rows[0].photo.split('id=')[1]
                    await deleteDrive(id_drive)
                }
                filePhoto = await uploadGoogleDrive(photo)
            }
            const data = {
                id,
                name,
                phonenumber,
                description,
                email: email ? email : toko.rows[0].email,
                photo: filePhoto.id ? `https://drive.google.com/uc?export=view&id=${filePhoto.id}` : null
            }
            const updateStore = await modelStore.update(data)
            if (!updateStore) {
                res.status(403).json("update failed")
            }
            commonHelper(res, data, 200, 'updated Toko')
        } catch (error) {
            next(error)
        }
    }

}

export default storeController;
