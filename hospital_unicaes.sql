-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-02-2025 a las 04:41:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarConsulta` (IN `p_id_consulta` INT, IN `p_id_tipo_consulta` INT, IN `p_id_paciente` INT, IN `p_id_especialidad` INT, IN `p_estado_paciente` VARCHAR(250), IN `p_motivo_consulta` VARCHAR(500), IN `p_fecha_consulta` DATE)   BEGIN
    UPDATE consulta
    SET
        id_tipo_consulta = p_id_tipo_consulta,
        id_paciente = p_id_paciente,
        id_especialidad = p_id_especialidad,
        estado_paciente = p_estado_paciente,
        motivo_consulta = p_motivo_consulta,
        fecha_consulta = p_fecha_consulta
    WHERE
        id_consulta = p_id_consulta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActualizarDetalleConsulta` (IN `p_id_detalle_consulta` INT, IN `p_id_estado_consulta` INT, IN `p_motivo_consulta` TEXT, IN `p_presente_enfermedad` VARCHAR(500), IN `p_antecedentes` VARCHAR(400), IN `p_presion_arterial` VARCHAR(50), IN `p_frecuencia_cardiaca` VARCHAR(50), IN `p_saturacion_oxigeno` VARCHAR(50), IN `p_temperatura` VARCHAR(50), IN `p_peso` VARCHAR(50), IN `p_altura` VARCHAR(50), IN `p_diagnostico` TEXT, IN `p_observaciones` TEXT, IN `p_examen_fisico` VARCHAR(800), IN `p_id_consulta` INT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cambiarEstadoUsuario` (IN `p_id_usuario` INT, IN `p_estado` VARCHAR(255))   BEGIN
    UPDATE usuario 
    SET 
        estado = p_estado
    WHERE id_usuario = p_id_usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DetalleConsultaById` (IN `p_idUsuario` INT)   BEGIN
    SELECT 
    dc.id_detalle_consulta,
    p.nombre_paciente,
    p.apellido_paciente,
    dc.motivo_consulta,
    dc.presente_enfermedad,
    dc.diagnostico,
    e.nombre_estado_consulta
    FROM 
        detalle_consulta dc
        JOIN consulta c on dc.id_consulta = c.id_consulta
        JOIN estado_consulta e on dc.id_estado_consulta = e.id_estado_consulta
        JOIN paciente p on c.id_paciente = p.id_paciente
    WHERE 
        c.id_usuario = p_idUsuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarArea` (IN `p_nombre_area` VARCHAR(250))   BEGIN
	
	INSERT into area(nombre_area) VALUES (p_nombre_area);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarConsulta` (IN `p_id_tipo_consulta` INT, IN `p_id_paciente` INT, IN `p_id_especialidad` INT, IN `p_estado_paciente` VARCHAR(250), IN `p_motivo_consulta` VARCHAR(500))   BEGIN
    INSERT INTO consulta (
        id_tipo_consulta,
        id_paciente,
		id_especialidad,
        estado_paciente,
        motivo_consulta,
        fecha_consulta
    ) VALUES (
        p_id_tipo_consulta,
        p_id_paciente,
        p_id_especialidad,
        p_estado_paciente,
        p_motivo_consulta,
        CURRENT_DATE 
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertarDetalleConsulta` (IN `p_id_estado_consulta` INT, IN `p_motivo_consulta` TEXT, IN `p_presente_enfermedad` VARCHAR(500), IN `p_antecedentes` VARCHAR(400), IN `p_presion_arterial` VARCHAR(50), IN `p_frecuencia_cardiaca` VARCHAR(50), IN `p_saturacion_oxigeno` VARCHAR(50), IN `p_temperatura` VARCHAR(50), IN `p_peso` VARCHAR(50), IN `p_altura` VARCHAR(50), IN `p_diagnostico` TEXT, IN `p_observaciones` TEXT, IN `p_examen_fisico` VARCHAR(800), IN `p_id_consulta` INT)   BEGIN
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
    
    
     -- Actualizar el estado en consulta
    UPDATE consulta
    SET estado = 'tomada'
    WHERE id_consulta = p_id_consulta;
    
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ListarConsultaById` (IN `p_idUsuario` INT)   BEGIN
  SELECT c.id_consulta, tc.nombre_tipo_consulta, p.nombre_paciente, p.apellido_paciente, e.nombre_especialidad, c.id_usuario, c.estado_paciente, c.motivo_consulta, c.fecha_consulta FROM consulta c LEFT JOIN tipo_consulta tc ON c.id_tipo_consulta = tc.id_tipo_consulta LEFT JOIN paciente p ON c.id_paciente = p.id_paciente LEFT JOIN especialidad e ON c.id_especialidad = e.id_especialidad LEFT JOIN usuario u ON c.id_usuario = u.id_usuario WHERE c.estado = 'pendiente' AND c.id_usuario = p_idUsuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ListarPaciente` (IN `p_idPaciente` INT(11))   BEGIN 

SELECT * FROM paciente WHERE id_paciente =  p_idPaciente; 

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ListarUsuarios` (IN `p_idUsuario` INT(11))   BEGIN 

SELECT * FROM usuario WHERE id_usuario =  p_idUsuario; 

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_loginUsuario` (IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255))   BEGIN
    SELECT usuario.*, rol.nombre_rol 
    FROM usuario 
    JOIN rol ON usuario.id_rol = rol.id_rol 
    WHERE usuario.email = p_email 
      AND usuario.password = p_password;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_loginUsuarioV02` (IN `p_email` VARCHAR(255))   BEGIN
    SELECT usuario.*, rol.nombre_rol 
    FROM usuario 
    JOIN rol ON usuario.id_rol = rol.id_rol 
    WHERE email = p_email;
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
(24, 'area de gersito', 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `id_consulta` int(11) NOT NULL,
  `id_tipo_consulta` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_especialidad` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `estado_paciente` varchar(250) DEFAULT NULL,
  `motivo_consulta` varchar(500) DEFAULT NULL,
  `fecha_consulta` date DEFAULT NULL,
  `estado` enum('pendiente','tomada') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consulta`
--

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
  `frecuencia_cardiaca` varchar(50) DEFAULT NULL,
  `saturacion_oxigeno` varchar(50) DEFAULT NULL,
  `temperatura` varchar(50) DEFAULT NULL,
  `peso` varchar(50) DEFAULT NULL,
  `altura` varchar(50) DEFAULT NULL,
  `diagnostico` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `examen_fisico` varchar(800) DEFAULT NULL,
  `id_consulta` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_consulta`
--
--
-- Disparadores `detalle_consulta`
--
DELIMITER $$
CREATE TRIGGER `trg_detalleConsulta_historialMedico` AFTER INSERT ON `detalle_consulta` FOR EACH ROW BEGIN
    INSERT INTO historial_medico (
        descripcion_his_medico,
        fecha,
        id_detalle_consulta
    ) VALUES (
        NEW.presente_enfermedad, -- El valor de 'p_presente_enfermedad' del procedimiento insertado
        NOW(),                  -- Fecha y hora actual
        NEW.id_detalle_consulta -- El ID generado automáticamente para el detalle insertado
    );
END
$$
DELIMITER ;

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
(1, 'Cardiología', 'inactivo'),
(2, 'Pediatrias gersonnnnn', 'inactivo'),
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
(23, 'siatemas', 'activo');

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
(1, 'EXP12345', 'Juan', 'Pérez', '1985-04-23', '01234567-8', 'M', '77889900', 'Calle 123, Ciudad', 'María Pérez', '77889911', 'Hermana', 'José Pérez', '01234567-9', '77889922', 'Padre', 'inactivo'),
(2, 'EXP12346', 'Ana', 'López', '1992-09-10', '98765432-1', 'F', '66554433', 'Avenida 45, Ciudad', 'Pedro López', '66554434', 'Hermano', 'Juana López', '98765432-2', '66554435', 'Madre', 'activo');
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
(3, 'Enfermero', 'Enfermero', 'activo');

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
(1, 'Administrador ', 'Principal', '89329483-4', '7667-6767', 'administrador@gmail.com', '$2b$10$a4wct0k2f4.Q.2LzgT51jO7wrK4NQwdkTdG582jwxmVVQk3ls8v82', 'direccion', '2024-10-29', 'M', '', 'activo', 1, 36, 11),
(2, 'Enfermero', '1', '06351665-3', '1212-1121', 'enfermero1@gmail.com', '$2b$10$KYv544uxzlyzfi/rddipR.I2qyQ2PRjjwYZI9kQbqcEc4Phy9p7XC', 'direccion', '1998-09-13', 'M', '', 'activo', 3, 2, 1),
(3, 'Medico', '1', '00019212-3', '77787042', 'medico1@gmail.com', '$2b$10$/RRwLW07PPBup2Ua//oC3enYGPerQ0lOtcAmlqlXH/0w7SrloY1XO', 'direccion', '1990-08-12', 'F', '', 'inactivo', 2, 1, 2),
(4, 'Marlyn', 'Calidonio', '23436709-9', '0000-0000', 'marlyn@gmail.com', '$2b$10$BWYW2TuGyS2uPvQFv2axg.HcrgguhAlmWHxyagBoisFdeoqTfui92', 'Santa Ana', '1987-10-08', 'F', '', 'activo', 3, 9, 8);
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
  ADD KEY `fk_especialidad` (`id_especialidad`),
  ADD KEY `fk_id_usuario` (`id_usuario`);

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
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `consulta`
--
ALTER TABLE `consulta`
  MODIFY `id_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `detalle_consulta`
--
ALTER TABLE `detalle_consulta`
  MODIFY `id_detalle_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `estado_consulta`
--
ALTER TABLE `estado_consulta`
  MODIFY `id_estado_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  MODIFY `id_historial_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_consulta`
--
ALTER TABLE `tipo_consulta`
  MODIFY `id_tipo_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_ibfk_1` FOREIGN KEY (`id_tipo_consulta`) REFERENCES `tipo_consulta` (`id_tipo_consulta`),
  ADD CONSTRAINT `consulta_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`),
  ADD CONSTRAINT `fk_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

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
