import commonHelper from "../helper/common.js";
import {
    uploadGoogleDriveProduct,
    uploadGoogleDrive
} from "../utils/uploadGoogleDrive.js";
import deleteDrive from "../utils/deleteDrive.js";
import modelStore from "../models/store.js";


const storeController = {
    getStore: async (req, res, next) => {
        const toko = await modelStore.getAll()
        commonHelper(res, toko, 200, "success")
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
            console.log(filePhoto)
            const data = {
                id,
                name,
                phonenumber,
                description,
                email: email ? email : toko.rows[0].email,
                photo: filePhoto.id ? `https://drive.google.com/uc?export=view&id=${filePhoto.id}` : null
            }
            await modelStore.update(data)
            commonHelper(res, data, 200, 'updated Toko')
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

}

export default storeController;
