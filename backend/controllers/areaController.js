const Area = require('../models/AreaModel');


// Metodo Read: Listar areas (activas)
exports.listarArea = (req, res) => {
    Area.listarArea((err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error al listar las areas", error: err });
        }

        res.status(200).json(results);
    });
};


//Metodo Insert
exports.insertarArea = (req, res) => {
    const areaData = req.body;

    Area.insertarArea(areaData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al registrar la area", error: err });
        }

        res.status(200).json({ message: "Area registrada" });
    });
};



//Metodo Update
exports.actualizarArea = (req, res) => {
    const areaData = req.body;
    const id = req.params.id;

    Area.actualizarArea(id, areaData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al actualizar la area", error: err });
        }
        res.status(200).json({ message: "Area actualizada" });
    });
};


// Cambiar estado de la area, metodo DELETE
exports.cambiarEstadoArea = (req, res) => {
    const { id, estado } = req.body;

    Area.cambiarEstadoArea(id, estado, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al cambiar estado de la area", error: err });
        }

        res.status(200).json({ message: "Estado de la area actualizada" });
    });
};