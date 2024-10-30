const Usuario = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');


// Metodo Read: Listar usuarios (activos)
exports.listarUsuarios = (req, res) => {
    Usuario.listarUsuarios((err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error al listar los usuarios", error: err });
        }

        res.status(200).json(results);
    });
};


//Metodo Insert
// exports.insertarUsuario = (req, res) => {
//     const usuarioData = req.body;

//     Usuario.insertarUsuario(usuarioData, (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: "Error al registrar el usuario", error: err });
//         }

//         res.status(200).json({ message: "Usuario registrado" });
//     });
// };

//METODO INSERT CON ENCRIPTACION:

exports.insertarUsuario = async (req, res) => {
    const usuarioData = req.body;

    try {
        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(usuarioData.password, saltRounds);

        // Reemplazar la contraseña con la encriptada
        usuarioData.password = hashedPassword;

        // Llamar al método de inserción
        Usuario.insertarUsuario(usuarioData, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error al registrar el usuario", error: err });
            }

            res.status(200).json({ message: "Usuario registrado" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error al encriptar la contraseña", error });
    }
};


//Metodo Update
exports.actualizarUsuario = (req, res) => {
    const usuarioData = req.body;
    const id = req.params.id;

    Usuario.actualizarUsuario(id, usuarioData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al actualizar el usuario", error: err });
        }
        res.status(200).json({ message: "Usuario actualizado" });
    });
};


// Cambiar estado del usuario, metodo DELETE
exports.cambiarEstadoUsuario = (req, res) => {
    const { id, estado } = req.body;

    Usuario.cambiarEstadoUsuario(id, estado, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al cambiar estado del usuario", error: err });
        }

        res.status(200).json({ message: "Estado del usuario actualizado" });
    });
};