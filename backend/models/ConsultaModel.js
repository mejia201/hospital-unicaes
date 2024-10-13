const db = require('../database/conexion')


const Consulta = {};


// Listar consultas (activas)
Consulta.listarConsultasActivos = (callback) => {
    const sql = `SELECT * FROM consulta WHERE estado = 'activo'`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al listar consultas activas:", err);
            return callback(err, null);
        }
        return callback(null, results);
    });
};


Consulta.insertarConsulta = (consultaData, callback) => {
    const sql = `CALL sp_InsertarConsulta(?, ?, ?, ?, ?)`;

    const {
        id_tipo_consulta,
        id_paciente,
        estado_paciente,
        motivo_consulta,
        fecha_consulta
    } = consultaData;

    db.query(sql, [
        id_tipo_consulta,
        id_paciente,
        estado_paciente,
        motivo_consulta,
        fecha_consulta
    ], (err, result) => {
        if (err) {
            console.error("Error al insertar la consulta:", err);
            return callback(err, null);
        }

        return callback(null, result);
    });
};


Consulta.tomarConsulta = (id, consultaData, callback) => {
    const sql = `CALL sp_TomarConsulta(?, ?)`;

    const {
        id_usuario
    } = consultaData;

    db.query(sql, [
        id, 
        id_usuario,
    ], (err, result) => {
        if (err) {
            console.error("Error al tomar la consulta:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};

Consulta.actualizarConsulta = (id, consultaData, callback) => {
    const sql = `CALL sp_ActualizarConsulta(?, ?, ?, ?, ?, ?, ?)`;

    const {
        id_tipo_consulta,
        id_paciente,
        id_usuario,
        estado_paciente,
        motivo_consulta,
        fecha_consulta
    } = consultaData;

    db.query(sql, [
        id, 
        id_tipo_consulta,
        id_paciente,
        id_usuario,
        estado_paciente,
        motivo_consulta,
        fecha_consulta
    ], (err, result) => {
        if (err) {
            console.error("Error al actualizar la consulta:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};




// Cambiar estado de una consulta, metodo DELETE pero solo cambio de estado,  no elimina registros (no es recomendado)
Consulta.cambiarEstadoConsulta = (id, nuevoEstado, callback) => {
    const sql = `UPDATE consulta SET estado = ? WHERE id_consulta = ?`;

    db.query(sql, [nuevoEstado, id], (err, result) => {
        if (err) {
            console.error("Error al cambiar estado de la consulta:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};

module.exports = Consulta;
