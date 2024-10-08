const db = require('../database/conexion');

const Usuario = {
    loginUsuario: (email, password, callback) => {
        const sql = `CALL sp_loginUsuario(?, ?)`;
        db.query(sql, [email, password], (err, result) => {
            if (err) {
                return callback(err, null);
            }
          
            const data = result[0];
            callback(null, data);
        });
    }
};

module.exports = Usuario;
