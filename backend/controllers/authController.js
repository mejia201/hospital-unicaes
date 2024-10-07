const db = require('../database/conexion')


const login = (req, res) => {
    const sql = `
        SELECT usuario.*, rol.nombre_rol FROM usuario 
        JOIN rol ON usuario.id_rol = rol.id_rol 
        WHERE usuario.email = ? AND usuario.password = ?`;

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error en la consulta", error: err });
        }
        if (data.length > 0) {
            req.session.user = {
                nombre: data[0].nombre,
                apellido: data[0].apellido,
                rol: data[0].nombre_rol
            };
            console.log('Usuario autenticado', { user: req.session.user });
            return res.status(200).json({ message: "Success"});
        } else {
            return res.status(401).json({ message: "Fail" });
        }
    });
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error al cerrar sesión" });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: "Sesión cerrada con éxito" });
    });
};

const getUser = (req, res) => {
    if (req.session.user) {
        return res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso",
            user: req.session.user
        });
    } else {
        return res.status(200).json({
            success: false,
            message: "No hay sesión activa"
        });
    }
};




module.exports = { login, logout, getUser };