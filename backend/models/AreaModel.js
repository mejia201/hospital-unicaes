const db = require('../database/conexion')


const Area = {};


// Listar areas
Area.listarArea = (callback) => {
    //const sql = `SELECT * FROM area WHERE estado = 'activo' `;
    const sql = `SELECT * FROM area`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al listar las areas:", err);
            return callback(err, null);
        }
        return callback(null, results);
    });
};


Area.insertarArea = (areaData, callback) => {
    const sql = `CALL sp_InsertarArea(?)`;

    const {
        nombre_area
    } = areaData;

    db.query(sql, [
       nombre_area
    ], (err, result) => {
        if (err) {
            console.error("Error al insertar la area:", err);
            return callback(err, null);
        }

        return callback(null, result);
    });
};


Area.actualizarArea = (id, areaData, callback) => {
    const sql = `CALL sp_ActualizarArea(?, ?)`;

    const {
        nombre_area
    } = areaData;

    db.query(sql, [
        id, nombre_area
    ], (err, result) => {
        if (err) {
            console.error("Error al actualizar la area:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};

// Cambiar estado de una area, metodo DELETE pero solo cambio de estado,  no elimina registros (no es recomendado)
Area.cambiarEstadoArea = (id, nuevoEstado, callback) => {
    const sql = `UPDATE area SET estado = ? WHERE id_area = ?`;

    db.query(sql, [nuevoEstado, id], (err, result) => {
        if (err) {
            console.error("Error al cambiar estado de la area:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};

module.exports = Area;
