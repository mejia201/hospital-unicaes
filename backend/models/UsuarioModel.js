const db = require('../database/conexion');


const Usuario = {};

    // Login 
    Usuario.loginUsuario = (email, password, callback) => {
        const sql = `CALL sp_loginUsuario(?, ?)`;
        db.query(sql, [email, password], (err, result) => {
            if (err) {
                return callback(err, null);
            }
          
            const data = result[0];
            callback(null, data);
        });
    }


    // Listar usuarios esta es la ruta o la consulta que se hace modificada.
Usuario.listarUsuarios = (callback) => {
    const sql = ` SELECT u.id_usuario, u.nombre, u.apellido, u.dui, u.telefono, u.email, u.password, u.direccion, u.fecha_nacimiento, u.sexo, u.numero_seguro_social, u.estado,u.id_rol,
           r.nombre_rol,u.id_especialidad, e.nombre_especialidad,u.id_area, a.nombre_area
    FROM usuario u
    LEFT JOIN rol r ON u.id_rol = r.id_rol
    LEFT JOIN especialidad e ON u.id_especialidad = e.id_especialidad
    LEFT JOIN area a ON u.id_area = a.id_area`; //  ELIMINAR ESTA CLAUSULA SI SE QUIERE MOSTRAR LOS ACTIVOS TAMBIEN
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al listar los usuarios:", err);
            return callback(err, null);
        }
        return callback(null, results);
    });
};


Usuario.insertarUsuario= (usuarioData, callback) => {
    const sql = `CALL sp_InsertarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const {
        nombre,
        apellido,
        dui,
        telefono,
        email,
        password,
        direccion,
        fecha_nacimiento,
        sexo,
        numero_seguro_social,
        id_rol,
        id_especialidad,
        id_area
    } = usuarioData;

    db.query(sql, [
        nombre,
        apellido,
        dui,
        telefono,
        email,
        password,
        direccion,
        fecha_nacimiento,
        sexo,
        numero_seguro_social,
        id_rol,
        id_especialidad,
        id_area
    ], (err, result) => {
        if (err) {
            console.error("Error al insertar el usuario:", err);
            return callback(err, null);
        }

        return callback(null, result);
    });
};





Usuario.actualizarUsuario = (id, usuarioData, callback) => {
    const sql = `CALL sp_ActualizarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const {
        nombre,
        apellido,
        dui,
        telefono,
        email,
        password,
        direccion,
        fecha_nacimiento,
        sexo,
        numero_seguro_social,
        id_rol,
        id_especialidad,
        id_area
    } = usuarioData;

    db.query(sql, [
        id,
        nombre,
        apellido,
        dui,
        telefono,
        email,
        password,
        direccion,
        fecha_nacimiento,
        sexo,
        numero_seguro_social,
        id_rol,
        id_especialidad,
        id_area
    ], (err, result) => {
        if (err) {
            console.error("Error al actualizar el usuario:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};

// Cambiar estado de un usuario, metodo DELETE pero solo cambio de estado,  no elimina registros (no es recomendado)
Usuario.cambiarEstadoUsuario = (id, nuevoEstado, callback) => {
    const sql = `UPDATE usuario SET estado = ? WHERE id_usuario = ?`;

    db.query(sql, [nuevoEstado, id], (err, result) => {
        if (err) {
            console.error("Error al cambiar estado del usuario:", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
};

module.exports = Usuario;
