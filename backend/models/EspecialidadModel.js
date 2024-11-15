const db = require('../database/conexion')


const Especialidad = {};


// Listar areas
Especialidad.listarEspecialidad= (callback) => {
    //const sql = `SELECT * FROM especialidad WHERE estado = 'activo' `;
    const sql = `SELECT * FROM especialidad`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al listar las especialidades:", err);
            return callback(err, null);
        }
        return callback(null, results);
    });
};


Especialidad.insertarEspecialidad = (especialidadData, callback) => {
    const sql = `CALL sp_InsertarEspecialidad(?)`;

    const {
        nombre_especialidad
    } = especialidadData;

    db.query(sql, [
        nombre_especialidad
    ], (err, result) => {
        if (err) {
            console.error("Error al insertar la especialidad:", err);
            return callback(err, null);
        }

        return callback(null, result);
    });
};


Especialidad.actualizarEspecialidad = (id, especialidadData, callback) => {
    const sql = `CALL sp_ActualizarEspecialidad(?, ?)`;

    const {
        nombre_especialidad
    } = especialidadData;

    db.query(sql, [
        id, nombre_especialidad
    ], (err, result) => {
        if (err) {
            console.error("Error al actualizar la especialidad:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};

// Cambiar estado de una especialidad, metodo DELETE pero solo cambio de estado,  no elimina registros (no es recomendado)
Especialidad.cambiarEstadoEspecialidad = (id, nuevoEstado, callback) => {
    const sql = `UPDATE especialidad SET estado = ? WHERE id_especialidad = ?`;

    db.query(sql, [nuevoEstado, id], (err, result) => {
        if (err) {
            console.error("Error al cambiar estado de la especialidad:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};

module.exports = Especialidad;
