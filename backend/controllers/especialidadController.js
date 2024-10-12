const Especialidad = require('../models/EspecialidadModel');


// Metodo Read: Listar especialidades (activas)
exports.listarEspecialidad = (req, res) => {
    Especialidad.listarEspecialidad((err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error al listar las especialidades", error: err });
        }

        res.status(200).json(results);
    });
};


//Metodo Insert
exports.insertarEspecialidad = (req, res) => {
    const especialidadData = req.body;

    Especialidad.insertarEspecialidad(especialidadData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al registrar la especialidad", error: err });
        }

        res.status(200).json({ message: "Especialidad registrada" });
    });
};



//Metodo Update
exports.actualizarEspecialidad = (req, res) => {
    const especialidadData = req.body;
    const id = req.params.id;

    Especialidad.actualizarEspecialidad(id, especialidadData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al actualizar la especialidad", error: err });
        }
        res.status(200).json({ message: "Especialidad actualizada" });
    });
};


// Cambiar estado de la especialidad, metodo DELETE
exports.cambiarEstadoEspecialidad = (req, res) => {
    const { id, estado } = req.body;

    Especialidad.cambiarEstadoEspecialidad(id, estado, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al cambiar estado de la especialidad", error: err });
        }

        res.status(200).json({ message: "Estado de la especialidad actualizada" });
    });
};