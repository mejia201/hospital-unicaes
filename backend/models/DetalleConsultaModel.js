const db = require('../database/conexion')


const DetalleConsulta = {};


// Listar consultas (activas)
DetalleConsulta.listarDetallesConsultasActivas = (callback) => {
    const sql = `SELECT * FROM detalle_consulta WHERE estado = 'activo'`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al listar el detalle de las consultas activas:", err);
            return callback(err, null);
        }
        return callback(null, results);
    });
};


DetalleConsulta.insertarDetalleConsulta = (consultaDetalleData, callback) => {
    const sql = `CALL sp_InsertarDetalleConsulta(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const {
        id_estado_consulta,
        motivo_consulta,
        presente_enfermedad,
        antecedentes,
        presion_arterial,
        frecuencia_cardiaca,
        saturacion_oxigeno,
        temperatura,
        peso,
        altura,
        diagnostico,
        observaciones,
        examen_fisico,
        id_consulta
    } = consultaDetalleData;

    db.query(sql, [
        id_estado_consulta,
        motivo_consulta,
        presente_enfermedad,
        antecedentes,
        presion_arterial,
        frecuencia_cardiaca,
        saturacion_oxigeno,
        temperatura,
        peso,
        altura,
        diagnostico,
        observaciones,
        examen_fisico,
        id_consulta
    ], (err, result) => {
        if (err) {
            console.error("Error al insertar el detalle de la consulta:", err);
            return callback(err, null);
        }

        return callback(null, result);
    });
};



DetalleConsulta.actualizarDetalleConsulta = (id, consultaDetalleData, callback) => {
    const sql = `CALL sp_ActualizarDetalleConsulta(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const {
        id_estado_consulta,
        motivo_consulta,
        presente_enfermedad,
        antecedentes,
        presion_arterial,
        frecuencia_cardiaca,
        saturacion_oxigeno,
        temperatura,
        peso,
        altura,
        diagnostico,
        observaciones,
        examen_fisico,
        id_consulta
    } = consultaDetalleData;

    db.query(sql, [
        id, 
        id_estado_consulta,
        motivo_consulta,
        presente_enfermedad,
        antecedentes,
        presion_arterial,
        frecuencia_cardiaca,
        saturacion_oxigeno,
        temperatura,
        peso,
        altura,
        diagnostico,
        observaciones,
        examen_fisico,
        id_consulta
    ], (err, result) => {
        if (err) {
            console.error("Error al actualizar el detalle de la consulta:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};




// Cambiar estado del detalle de la consulta, metodo DELETE pero solo cambio de estado,  no elimina registros (no es recomendado)
DetalleConsulta.cambiarEstadoDetalleConsulta = (id, nuevoEstado, callback) => {
    const sql = `UPDATE detalle_consulta SET estado = ? WHERE id_consulta = ?`;

    db.query(sql, [nuevoEstado, id], (err, result) => {
        if (err) {
            console.error("Error al cambiar estado del detalle de la consulta:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};

module.exports = DetalleConsulta;
