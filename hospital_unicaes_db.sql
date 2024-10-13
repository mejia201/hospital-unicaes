-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 13-10-2024 a las 04:38:42
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hospital_unicaes`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarArea` (IN `p_id_area` INT, IN `p_nombre_area` VARCHAR(250))   BEGIN
	
	UPDATE area SET nombre_area = p_nombre_area WHERE id_area = p_id_area;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarConsulta` (IN `p_id_consulta` INT, IN `p_id_tipo_consulta` INT, IN `p_id_paciente` INT, IN `p_id_usuario` INT, IN `p_estado_paciente` VARCHAR(250), IN `p_motivo_consulta` VARCHAR(500), IN `p_fecha_consulta` DATE)   BEGIN
    UPDATE consulta
    SET
        id_tipo_consulta = p_id_tipo_consulta,
        id_paciente = p_id_paciente,
        id_usuario = p_id_usuario,
        estado_paciente = p_estado_paciente,
        motivo_consulta = p_motivo_consulta,
        fecha_consulta = p_fecha_consulta
    WHERE
        id_consulta = p_id_consulta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarDetalleConsulta` (IN `p_id_detalle_consulta` INT, IN `p_id_estado_consulta` INT, IN `p_motivo_consulta` TEXT, IN `p_presente_enfermedad` VARCHAR(500), IN `p_antecedentes` VARCHAR(400), IN `p_presion_arterial` VARCHAR(50), IN `p_frecuencia_cardiaca` FLOAT, IN `p_saturacion_oxigeno` FLOAT, IN `p_temperatura` FLOAT, IN `p_peso` FLOAT, IN `p_altura` FLOAT, IN `p_diagnostico` TEXT, IN `p_observaciones` TEXT, IN `p_examen_fisico` VARCHAR(800), IN `p_id_consulta` INT)   BEGIN
    UPDATE detalle_consulta
    SET
        id_estado_consulta = p_id_estado_consulta,
        motivo_consulta = p_motivo_consulta,
        presente_enfermedad = p_presente_enfermedad,
        antecedentes = p_antecedentes,
        presion_arterial = p_presion_arterial,
        frecuencia_cardiaca = p_frecuencia_cardiaca,
        saturacion_oxigeno = p_saturacion_oxigeno,
        temperatura = p_temperatura,
        peso = p_peso,
        altura = p_altura,
        diagnostico = p_diagnostico,
        observaciones = p_observaciones,
        examen_fisico = p_examen_fisico,
        id_consulta = p_id_consulta
    WHERE
        id_detalle_consulta = p_id_detalle_consulta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarEspecialidad` (IN `p_id_especialidad` INT, IN `p_nombre_especialidad` VARCHAR(250))   BEGIN
	
	UPDATE especialidad SET nombre_especialidad =  p_nombre_especialidad WHERE id_especialidad = p_id_especialidad;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarHistorialMedico` (IN `p_id_historial_medico` INT, IN `p_descripcion_his_medico` TEXT, IN `p_fecha` DATE, IN `p_id_detalle_consulta` INT)   BEGIN
    UPDATE historial_medico
    SET
        descripcion_his_medico = p_descripcion_his_medico,
        fecha = p_fecha,
        id_detalle_consulta = p_id_detalle_consulta
    WHERE
        id_historial_medico = p_id_historial_medico;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarPaciente` (IN `p_id_paciente` INT, IN `p_n_expediente` VARCHAR(50), IN `p_nombre_paciente` VARCHAR(100), IN `p_apellido_paciente` VARCHAR(100), IN `p_fecha_nacimiento_paciente` DATE, IN `p_dui_paciente` VARCHAR(10), IN `p_sexo_paciente` VARCHAR(10), IN `p_telefono_paciente` VARCHAR(15), IN `p_direccion_paciente` TEXT, IN `p_contactoE_nombre` VARCHAR(100), IN `p_contactoE_telefono` VARCHAR(15), IN `p_contactoE_parentesco` VARCHAR(50), IN `p_responsable_nombre` VARCHAR(100), IN `p_responsable_dui` VARCHAR(10), IN `p_responsable_telefono` VARCHAR(15), IN `p_responsable_parentesco` VARCHAR(50))   BEGIN
    UPDATE paciente 
    SET 
        n_expediente = p_n_expediente,
        nombre_paciente = p_nombre_paciente,
        apellido_paciente = p_apellido_paciente,
        fecha_nacimiento_paciente = p_fecha_nacimiento_paciente,
        dui_paciente = p_dui_paciente,
        sexo_paciente = p_sexo_paciente,
        telefono_paciente = p_telefono_paciente,
        direccion_paciente = p_direccion_paciente,
        contactoE_nombre = p_contactoE_nombre,
        contactoE_telefono = p_contactoE_telefono,
        contactoE_parentesco = p_contactoE_parentesco,
        responsable_nombre = p_responsable_nombre,
        responsable_dui = p_responsable_dui,
        responsable_telefono = p_responsable_telefono,
        responsable_parentesco = p_responsable_parentesco
    WHERE id_paciente = p_id_paciente;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarRol` (IN `p_id_rol` INT, IN `p_nombre_rol` VARCHAR(250), IN `p_cargo` VARCHAR(250))   BEGIN
    UPDATE rol 
    SET 
        nombre_rol = p_nombre_rol,
        cargo = p_cargo
    WHERE id_rol = p_id_rol;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarUsuario` (IN `p_id_usuario` INT, IN `p_nombre` VARCHAR(250), IN `p_apellido` VARCHAR(250), IN `p_dui` VARCHAR(10), IN `p_telefono` VARCHAR(12), IN `p_email` VARCHAR(250), IN `p_password` VARCHAR(250), IN `p_direccion` VARCHAR(400), IN `p_fecha_nacimiento` DATE, IN `p_sexo` CHAR(10), IN `p_numero_seguro_social` VARCHAR(15), IN `p_id_rol` INT, IN `p_id_especialidad` INT, IN `p_id_area` INT)   BEGIN
    UPDATE usuario
    SET
        nombre = p_nombre,
        apellido = p_apellido,
        dui = p_dui,
        telefono = p_telefono,
        email = p_email,
        password = p_password,
        direccion = p_direccion,
        fecha_nacimiento = p_fecha_nacimiento,
        sexo = p_sexo,
        numero_seguro_social = p_numero_seguro_social,
        id_rol = p_id_rol,
        id_especialidad = p_id_especialidad,
        id_area = p_id_area
    WHERE
        id_usuario = p_id_usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarArea` (IN `p_nombre_area` VARCHAR(250))   BEGIN
	
	INSERT into area(nombre_area) VALUES (p_nombre_area);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarConsulta` (IN `p_id_tipo_consulta` INT, IN `p_id_paciente` INT, IN `p_estado_paciente` VARCHAR(250), IN `p_motivo_consulta` VARCHAR(500), IN `p_fecha_consulta` DATE)   BEGIN
    INSERT INTO consulta (
        id_tipo_consulta,
        id_paciente,

        estado_paciente,
        motivo_consulta,
        fecha_consulta
    ) VALUES (
        p_id_tipo_consulta,
        p_id_paciente,
        p_estado_paciente,
        p_motivo_consulta,
        p_fecha_consulta
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarDetalleConsulta` (IN `p_id_estado_consulta` INT, IN `p_motivo_consulta` TEXT, IN `p_presente_enfermedad` VARCHAR(500), IN `p_antecedentes` VARCHAR(400), IN `p_presion_arterial` VARCHAR(50), IN `p_frecuencia_cardiaca` FLOAT, IN `p_saturacion_oxigeno` FLOAT, IN `p_temperatura` FLOAT, IN `p_peso` FLOAT, IN `p_altura` FLOAT, IN `p_diagnostico` TEXT, IN `p_observaciones` TEXT, IN `p_examen_fisico` VARCHAR(800), IN `p_id_consulta` INT)   BEGIN
    INSERT INTO detalle_consulta (
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
    ) VALUES (
        p_id_estado_consulta,
        p_motivo_consulta,
        p_presente_enfermedad,
        p_antecedentes,
        p_presion_arterial,
        p_frecuencia_cardiaca,
        p_saturacion_oxigeno,
        p_temperatura,
        p_peso,
        p_altura,
        p_diagnostico,
        p_observaciones,
        p_examen_fisico,
        p_id_consulta
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarEspecialidad` (IN `p_nombre_especialidad` VARCHAR(250))   BEGIN
	
	INSERT INTO especialidad (nombre_especialidad) VALUES(p_nombre_especialidad);
	
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarHistorialMedico` (IN `p_descripcion_his_medico` TEXT, IN `p_fecha` DATE, IN `p_id_detalle_consulta` INT)   BEGIN
    INSERT INTO historial_medico (
        descripcion_his_medico,
        fecha,
        id_detalle_consulta
    ) VALUES (
        p_descripcion_his_medico,
        p_fecha,
        p_id_detalle_consulta
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarPaciente` (IN `p_n_expediente` VARCHAR(250), IN `p_nombre_paciente` VARCHAR(250), IN `p_apellido_paciente` VARCHAR(250), IN `p_fecha_nacimiento_paciente` DATE, IN `p_dui_paciente` VARCHAR(10), IN `p_sexo_paciente` VARCHAR(10), IN `p_telefono_paciente` VARCHAR(12), IN `p_direccion_paciente` VARCHAR(400), IN `p_contactoE_nombre` VARCHAR(250), IN `p_contactoE_telefono` VARCHAR(12), IN `p_contactoE_parentesco` VARCHAR(100), IN `p_responsable_nombre` VARCHAR(250), IN `p_responsable_dui` VARCHAR(10), IN `p_responsable_telefono` VARCHAR(12), IN `p_responsable_parentesco` VARCHAR(100))   BEGIN
    INSERT INTO paciente (
        n_expediente, nombre_paciente, apellido_paciente, fecha_nacimiento_paciente,
        dui_paciente, sexo_paciente, telefono_paciente, direccion_paciente,
        contactoE_nombre, contactoE_telefono, contactoE_parentesco,
        responsable_nombre, responsable_dui, responsable_telefono, responsable_parentesco
    ) VALUES (
        p_n_expediente, p_nombre_paciente, p_apellido_paciente, p_fecha_nacimiento_paciente,
        p_dui_paciente, p_sexo_paciente, p_telefono_paciente, p_direccion_paciente,
        p_contactoE_nombre, p_contactoE_telefono, p_contactoE_parentesco,
        p_responsable_nombre, p_responsable_dui, p_responsable_telefono, p_responsable_parentesco
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarRol` (`p_nombre_rol` VARCHAR(250), `p_cargo` VARCHAR(250))   BEGIN
    INSERT INTO rol (
        nombre_rol, cargo
    ) VALUES (
       p_nombre_rol, p_cargo
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarUsuario` (IN `p_nombre` VARCHAR(250), IN `p_apellido` VARCHAR(250), IN `p_dui` VARCHAR(10), IN `p_telefono` VARCHAR(12), IN `p_email` VARCHAR(250), IN `p_password` VARCHAR(250), IN `p_direccion` VARCHAR(400), IN `p_fecha_nacimiento` DATE, IN `p_sexo` CHAR(10), IN `p_numero_seguro_social` VARCHAR(15), IN `p_id_rol` INT, IN `p_id_especialidad` INT, IN `p_id_area` INT)   BEGIN
    INSERT INTO usuario (
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
    ) VALUES (
        p_nombre,
        p_apellido,
        p_dui,
        p_telefono,
        p_email,
        p_password,
        p_direccion,
        p_fecha_nacimiento,
        p_sexo,
        p_numero_seguro_social,
        p_id_rol,
        p_id_especialidad,
        p_id_area
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_loginUsuario` (IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255))   BEGIN
    SELECT usuario.*, rol.nombre_rol 
    FROM usuario 
    JOIN rol ON usuario.id_rol = rol.id_rol 
    WHERE usuario.email = p_email AND usuario.password = p_password;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_TomarConsulta` (IN `p_id_consulta` INT, IN `p_id_usuario` INT)   BEGIN
    UPDATE consulta
    SET
        id_usuario = p_id_usuario

    WHERE
        id_consulta = p_id_consulta;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `nombre_area` varchar(250) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id_area`, `nombre_area`, `estado`) VALUES
(1, 'Pediatría', 'activo'),
(2, 'Cardiología', 'activo'),
(3, 'Neurología', 'activo'),
(4, 'Oncología', 'activo'),
(5, 'Ortopedia', 'activo'),
(6, 'Ginecología', 'activo'),
(7, 'Obstetricia', 'activo'),
(8, 'Urgencias', 'activo'),
(9, 'Cuidados Intensivos', 'activo'),
(10, 'Cirugía General', 'activo'),
(11, 'Urología', 'activo'),
(12, 'Dermatología', 'activo'),
(13, 'Endocrinología', 'activo'),
(14, 'Gastroenterología', 'activo'),
(15, 'Oftalmología', 'activo'),
(16, 'Otorrinolaringología', 'activo'),
(17, 'Psiquiatría', 'activo'),
(18, 'Reumatología', 'activo'),
(19, 'Neumología', 'activo'),
(20, 'Hematología', 'activo'),
(21, 'Radiología', 'activo'),
(22, 'Rehabilitación', 'activo'),
(23, 'Anestesiología', 'activo'),
(24, 'Prueba area actualizada', 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `id_consulta` int(11) NOT NULL,
  `id_tipo_consulta` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `estado_paciente` varchar(250) DEFAULT NULL,
  `motivo_consulta` varchar(500) DEFAULT NULL,
  `fecha_consulta` date DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consulta`
--

INSERT INTO `consulta` (`id_consulta`, `id_tipo_consulta`, `id_paciente`, `id_usuario`, `estado_paciente`, `motivo_consulta`, `fecha_consulta`, `estado`) VALUES
(1, 2, 1, 1, 'Estable', 'Dolor en el pecho', '2024-09-20', 'activo'),
(2, 1, 2, 2, 'Leve', 'Tos persistente', '2024-09-21', 'activo'),
(3, 1, 2, 6, 'Grave se va a morir, rapido', 'Dolor de cabeza persistente alto', '2024-10-12', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_consulta`
--

CREATE TABLE `detalle_consulta` (
  `id_detalle_consulta` int(11) NOT NULL,
  `id_estado_consulta` int(11) DEFAULT NULL,
  `motivo_consulta` text DEFAULT NULL,
  `presente_enfermedad` varchar(500) DEFAULT NULL,
  `antecedentes` varchar(400) DEFAULT NULL,
  `presion_arterial` varchar(50) DEFAULT NULL,
  `frecuencia_cardiaca` float DEFAULT NULL,
  `saturacion_oxigeno` float DEFAULT NULL,
  `temperatura` float DEFAULT NULL,
  `peso` float DEFAULT NULL,
  `altura` float DEFAULT NULL,
  `diagnostico` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `examen_fisico` varchar(800) DEFAULT NULL,
  `id_consulta` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_consulta`
--

INSERT INTO `detalle_consulta` (`id_detalle_consulta`, `id_estado_consulta`, `motivo_consulta`, `presente_enfermedad`, `antecedentes`, `presion_arterial`, `frecuencia_cardiaca`, `saturacion_oxigeno`, `temperatura`, `peso`, `altura`, `diagnostico`, `observaciones`, `examen_fisico`, `id_consulta`, `estado`) VALUES
(1, 2, 'Dolor en el pecho', 'Paciente refiere dolor desde hace 2 días', 'Hipertensión', '140', 80, 95, 37, 80, 1.75, 'Angina de pecho', 'Recomendar reposo', 'Examen de tórax normal', 1, 'activo'),
(2, 2, 'Tos persistente', 'Paciente con tos desde hace 1 semana', 'Asma infantil', '120', 75, 97, 36.5, 60, 1.65, 'Bronquitis leve', 'Recetar broncodilatadores', 'Examen respiratorio normal', 2, 'activo'),
(3, 1, 'Dolor de cabeza intenso', 'El paciente presenta dolor de cabeza desde hace 2 días', 'Sin antecedentes relevantes', '120/80', 75, 98, 36.5, 70.5, 1.75, 'Cefalea', 'Paciente refiere mejora con descanso que no ocurren 123', 'No se encuentran anomalías', 3, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id_especialidad` int(11) NOT NULL,
  `nombre_especialidad` varchar(250) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id_especialidad`, `nombre_especialidad`, `estado`) VALUES
(1, 'Cardiología', 'activo'),
(2, 'Pediatría', 'activo'),
(3, 'Dermatología', 'activo'),
(4, 'Neurología', 'activo'),
(5, 'Oncología', 'activo'),
(6, 'Ortopedia', 'activo'),
(7, 'Ginecología', 'activo'),
(8, 'Obstetricia', 'activo'),
(9, 'Urgencias', 'activo'),
(10, 'Cuidados Intensivos', 'activo'),
(11, 'Cirugía General', 'activo'),
(12, 'Urología', 'activo'),
(13, 'Endocrinología', 'activo'),
(14, 'Gastroenterología', 'activo'),
(15, 'Oftalmología', 'activo'),
(16, 'Otorrinolaringología', 'activo'),
(17, 'Psiquiatría', 'activo'),
(18, 'Reumatología', 'activo'),
(19, 'Neumología', 'activo'),
(20, 'Hematología', 'activo'),
(21, 'Radiología', 'activo'),
(22, 'Rehabilitación', 'activo'),
(23, 'Anestesiología', 'activo'),
(24, 'Especialidad prueba 2024', 'activo'),
(25, 'Especialidad prueba 2', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_consulta`
--

CREATE TABLE `estado_consulta` (
  `id_estado_consulta` int(11) NOT NULL,
  `nombre_estado_consulta` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_consulta`
--

INSERT INTO `estado_consulta` (`id_estado_consulta`, `nombre_estado_consulta`) VALUES
(1, 'Pendiente'),
(2, 'Completada'),
(3, 'Cancelada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_medico`
--

CREATE TABLE `historial_medico` (
  `id_historial_medico` int(11) NOT NULL,
  `descripcion_his_medico` text DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `id_detalle_consulta` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_medico`
--

INSERT INTO `historial_medico` (`id_historial_medico`, `descripcion_his_medico`, `fecha`, `id_detalle_consulta`, `estado`) VALUES
(1, 'Paciente con antecedentes de hipertensión', '2024-09-20', 1, 'activo'),
(2, 'Paciente con historial de asma infantil', '2024-09-21', 2, 'activo'),
(3, 'Paciente ha experimentado episodios recurrentes de dolor abdominal graves.', '2024-10-12', 3, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id_paciente` int(11) NOT NULL,
  `n_expediente` varchar(250) DEFAULT NULL,
  `nombre_paciente` varchar(250) DEFAULT NULL,
  `apellido_paciente` varchar(250) DEFAULT NULL,
  `fecha_nacimiento_paciente` date DEFAULT NULL,
  `dui_paciente` varchar(10) DEFAULT NULL,
  `sexo_paciente` varchar(10) DEFAULT NULL,
  `telefono_paciente` varchar(12) DEFAULT NULL,
  `direccion_paciente` varchar(400) DEFAULT NULL,
  `contactoE_nombre` varchar(250) DEFAULT NULL,
  `contactoE_telefono` varchar(12) DEFAULT NULL,
  `contactoE_parentesco` varchar(100) DEFAULT NULL,
  `responsable_nombre` varchar(250) DEFAULT NULL,
  `responsable_dui` varchar(10) DEFAULT NULL,
  `responsable_telefono` varchar(12) DEFAULT NULL,
  `responsable_parentesco` varchar(250) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `n_expediente`, `nombre_paciente`, `apellido_paciente`, `fecha_nacimiento_paciente`, `dui_paciente`, `sexo_paciente`, `telefono_paciente`, `direccion_paciente`, `contactoE_nombre`, `contactoE_telefono`, `contactoE_parentesco`, `responsable_nombre`, `responsable_dui`, `responsable_telefono`, `responsable_parentesco`, `estado`) VALUES
(1, 'EXP12345', 'Juan', 'Pérez', '1985-04-23', '01234567-8', 'M', '77889900', 'Calle 123, Ciudad', 'María Pérez', '77889911', 'Hermana', 'José Pérez', '01234567-9', '77889922', 'Padre', 'activo'),
(2, 'EXP12346', 'Ana', 'López', '1992-09-10', '98765432-1', 'F', '66554433', 'Avenida 45, Ciudad', 'Pedro López', '66554434', 'Hermano', 'Juana López', '98765432-2', '66554435', 'Madre', 'activo'),
(3, '12345', 'Juan', 'Pérez', '1990-01-01', '12345678-9', 'Masculino', '1234-5678', 'Av. Principal #123', 'Ana Pérez', '8765-4321', 'Hermana', '', '', '', '', 'activo'),
(4, '127473', 'Maria', 'Escobar', '1990-01-01', '12345678-9', 'Masculino', '1234-5678', 'Av. Principal #150', 'Ana Pérez', '8765-4321', 'Papá', '', '', '', '', 'activo'),
(5, '111111', 'Cambio solo de estado', 'Prueba', '1990-01-01', '01234567', 'Masculino', '12345678', 'Calle Falsa 123', 'Ana', '87654321', 'Hermana', '', '', '', '', 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(250) DEFAULT NULL,
  `cargo` varchar(250) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`, `cargo`, `estado`) VALUES
(1, 'Administrador', 'Administrador del sistema', 'activo'),
(2, 'Médico', 'Especialista médico', 'activo'),
(3, 'Enfermero', 'Enfermero', 'activo'),
(4, 'rol prueba 100', 'cargo prueba 100', 'activo'),
(5, 'rol prueba 2', 'cargo prueba 2', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_consulta`
--

CREATE TABLE `tipo_consulta` (
  `id_tipo_consulta` int(11) NOT NULL,
  `nombre_tipo_consulta` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_consulta`
--

INSERT INTO `tipo_consulta` (`id_tipo_consulta`, `nombre_tipo_consulta`) VALUES
(1, 'Externa'),
(2, 'Emergencia'),
(3, 'Hospitalizacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(250) DEFAULT NULL,
  `apellido` varchar(250) DEFAULT NULL,
  `dui` varchar(10) DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `direccion` varchar(400) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  `numero_seguro_social` varchar(15) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `id_rol` int(11) DEFAULT NULL,
  `id_especialidad` int(11) DEFAULT NULL,
  `id_area` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `dui`, `telefono`, `email`, `password`, `direccion`, `fecha_nacimiento`, `sexo`, `numero_seguro_social`, `estado`, `id_rol`, `id_especialidad`, `id_area`) VALUES
(1, 'Carlos', 'Mendoza', '12345678-9', '77881122', 'carlos.mendoza@example.com', 'carlosM123', 'Calle Principal 123, Ciudad', '1980-05-14', 'M', '123-45-6789', 'activo', 2, 1, 1),
(2, 'Sofía', 'Martínez', '87654321-0', '66553344', 'sofia.martinez@example.com', 'sofiaM123', 'Avenida Secundaria 456, Ciudad', '1985-07-30', 'F', '987-65-4321', 'activo', 2, 2, 3),
(3, 'Luis', 'García', '11223344-5', '77886655', 'luis.garcia@example.com', 'LuisG123', 'Boulevard Principal 789, Ciudad', '1978-02-11', 'M', '654-32-1098', 'activo', 1, NULL, 2),
(4, 'Marta', 'Vásquez', '22334455-6', '66778899', 'marta.vasquez@example.com', 'martaV123', 'Calle Tercera 321, Ciudad', '1990-09-22', 'F', '321-54-9876', 'activo', 3, NULL, 3),
(5, 'Juan IV', 'Perez', '12345678-9', '1234-5678', 'juan.perez@example.com', 'password123', '123 Calle Principal', '1990-01-01', 'M', '123-45-6789', 'activo', 1, 2, 3),
(6, 'Lucas', 'Perez', '12345678-9', '1234-5678', 'juan.perez@example.com', 'password123', '123 Calle Principal', '1990-01-01', 'M', '123-45-6789', 'activo', 2, 2, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indices de la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`id_consulta`),
  ADD KEY `id_tipo_consulta` (`id_tipo_consulta`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `detalle_consulta`
--
ALTER TABLE `detalle_consulta`
  ADD PRIMARY KEY (`id_detalle_consulta`),
  ADD KEY `id_estado_consulta` (`id_estado_consulta`),
  ADD KEY `id_consulta` (`id_consulta`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id_especialidad`);

--
-- Indices de la tabla `estado_consulta`
--
ALTER TABLE `estado_consulta`
  ADD PRIMARY KEY (`id_estado_consulta`);

--
-- Indices de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD PRIMARY KEY (`id_historial_medico`),
  ADD KEY `id_detalle_consulta` (`id_detalle_consulta`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id_paciente`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tipo_consulta`
--
ALTER TABLE `tipo_consulta`
  ADD PRIMARY KEY (`id_tipo_consulta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_especialidad` (`id_especialidad`),
  ADD KEY `id_area` (`id_area`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `consulta`
--
ALTER TABLE `consulta`
  MODIFY `id_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `detalle_consulta`
--
ALTER TABLE `detalle_consulta`
  MODIFY `id_detalle_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `estado_consulta`
--
ALTER TABLE `estado_consulta`
  MODIFY `id_estado_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  MODIFY `id_historial_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_consulta`
--
ALTER TABLE `tipo_consulta`
  MODIFY `id_tipo_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_ibfk_1` FOREIGN KEY (`id_tipo_consulta`) REFERENCES `tipo_consulta` (`id_tipo_consulta`),
  ADD CONSTRAINT `consulta_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`),
  ADD CONSTRAINT `consulta_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `detalle_consulta`
--
ALTER TABLE `detalle_consulta`
  ADD CONSTRAINT `detalle_consulta_ibfk_1` FOREIGN KEY (`id_estado_consulta`) REFERENCES `estado_consulta` (`id_estado_consulta`),
  ADD CONSTRAINT `detalle_consulta_ibfk_2` FOREIGN KEY (`id_consulta`) REFERENCES `consulta` (`id_consulta`);

--
-- Filtros para la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD CONSTRAINT `historial_medico_ibfk_1` FOREIGN KEY (`id_detalle_consulta`) REFERENCES `detalle_consulta` (`id_detalle_consulta`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`),
  ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
