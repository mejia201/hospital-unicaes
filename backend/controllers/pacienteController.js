const Paciente = require('../models/PacienteModel');


// Metodo Read: Listar pacientes (activos)
exports.listarPacientesActivos = (req, res) => {
    Paciente.listarPacientesActivos((err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error al listar los pacientes", error: err });
        }

        res.status(200).json(results);
    });
};


//Metodo Insert
exports.insertarPaciente = (req, res) => {
    const pacienteData = req.body;

    Paciente.insertarPaciente(pacienteData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al registrar el paciente", error: err });
        }

        res.status(200).json({ message: "Paciente registrado" });
    });
};



//Metodo Update
exports.actualizarPaciente = (req, res) => {
    const pacienteData = req.body;
    const id = req.params.id;

    Paciente.actualizarPaciente(id, pacienteData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al actualizar el paciente", error: err });
        }
        res.status(200).json({ message: "Paciente actualizado" });
    });
};


// Cambiar estado de paciente, metodo DELETE
exports.cambiarEstadoPaciente = (req, res) => {
    const { id, estado } = req.body;

    Paciente.cambiarEstadoPaciente(id, estado, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al cambiar estado del paciente", error: err });
        }

        res.status(200).json({ message: "Estado del paciente actualizado" });
    });
};