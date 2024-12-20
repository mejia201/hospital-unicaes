const db = require('../database/conexion')


const Paciente = {};


// Listar pacientes (activos)
Paciente.listarPacientesActivos = (callback) => {
    const sql = `SELECT * FROM paciente WHERE estado = 'activo'`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al listar pacientes activos:", err);
            return callback(err, null);
        }
        return callback(null, results);
    });
};


Paciente.ListarPacienteById = (id, callback) => {

    const sql = `CALL sp_ListarPaciente(?)`;
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al listar el paciente:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });

}

Paciente.insertarPaciente = (pacienteData, callback) => {
    const sql = `CALL sp_InsertarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const {
        n_expediente,
        nombre_paciente,
        apellido_paciente,
        fecha_nacimiento_paciente,
        dui_paciente,
        sexo_paciente,
        telefono_paciente,
        direccion_paciente,
        contactoE_nombre,
        contactoE_telefono,
        contactoE_parentesco,
        responsable_nombre,
        responsable_dui,
        responsable_telefono,
        responsable_parentesco
    } = pacienteData;

    db.query(sql, [
        n_expediente, nombre_paciente, apellido_paciente, fecha_nacimiento_paciente,
        dui_paciente, sexo_paciente, telefono_paciente, direccion_paciente,
        contactoE_nombre, contactoE_telefono, contactoE_parentesco,
        responsable_nombre, responsable_dui, responsable_telefono, responsable_parentesco
    ], (err, result) => {
        if (err) {
            console.error("Error al insertar el paciente:", err);
            return callback(err, null);
        }

        return callback(null, result);
    });
};


Paciente.actualizarPaciente = (id, pacienteData, callback) => {
    const sql = `CALL sp_ActualizarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const {
        n_expediente,
        nombre_paciente,
        apellido_paciente,
        fecha_nacimiento_paciente,
        dui_paciente,
        sexo_paciente,
        telefono_paciente,
        direccion_paciente,
        contactoE_nombre,
        contactoE_telefono,
        contactoE_parentesco,
        responsable_nombre,
        responsable_dui,
        responsable_telefono,
        responsable_parentesco
    } = pacienteData;

    db.query(sql, [
        id, n_expediente, nombre_paciente, apellido_paciente, fecha_nacimiento_paciente,
        dui_paciente, sexo_paciente, telefono_paciente, direccion_paciente,
        contactoE_nombre, contactoE_telefono, contactoE_parentesco,
        responsable_nombre, responsable_dui, responsable_telefono, responsable_parentesco
    ], (err, result) => {
        if (err) {
            console.error("Error al actualizar el paciente:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};




// Cambiar estado de un paciente, metodo DELETE pero solo cambio de estado,  no elimina registros (no es recomendado)
Paciente.cambiarEstadoPaciente = (id, callback) => {
    const sql = `UPDATE paciente SET estado = 'inactivo' WHERE id_paciente = ?`;
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.error("Error al cambiar el estado del paciente:", error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};
module.exports = Paciente;
