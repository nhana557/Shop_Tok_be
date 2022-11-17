const transaksi_datailModel = require("../models/transaksi_detail");

const transaksi_detailController = {
    allTransaksiDetail : (req, res)=>{
        transaksi_datailModel.transaksiDetail()
        .then(result => res.json(result.rows))
        .catch(err => res.send(err) );
    },
    insert : (req, res) =>{
        const { id, total, payment_id } = req.body;
        transaksi_datailModel.insert(id, total, payment_id)
        .then(res.json("Created Transaksi detail"))
        .catch(err => res.send(err));
    },
    update : (req, res) =>{
        const id = req.params.id;
        const {total, payment_id} = req.body;
        transaksi_datailModel.update(id, total, payment_id)
        .then(res.json("Updated transaksi_detail"))
        .catch(err => res.send(err));
    },
    delete : (req, res) =>{
        const id = req.params.id;
        transaksi_datailModel.deleted(id)
        .than(res.json("Deleted transaksi"))
        .catch(err => res.send(err));
    }
};

module.exports = transaksi_detailController;