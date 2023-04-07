import Pool from "../config/db.js";

export const selectAll = () => {
    return Pool.query("SELECT * FROM payment");
};

export const insert = (id, paying) => {
    return Pool.query(`insert into payment values(${id}, '${paying}')`);
};

export const update = (id, paying) => {
    return Pool.query(`UPDATE payment SET paying='${paying}' WHERE id=${id}`);
};

export const deleted = (id) => {
    return Pool.query(`DELETE FROM payment WHERE id=${id}`);
};
