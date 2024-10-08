-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-10-2024 a las 04:47:06
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_loginUsuario` (IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255))   BEGIN
    SELECT usuario.*, rol.nombre_rol 
    FROM usuario 
    JOIN rol ON usuario.id_rol = rol.id_rol 
    WHERE usuario.email = p_email AND usuario.password = p_password;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `nombre_area` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id_area`, `nombre_area`) VALUES
(1, 'Pediatría'),
(2, 'Cardiología'),
(3, 'Neurología'),
(4, 'Oncología'),
(5, 'Ortopedia'),
(6, 'Ginecología'),
(7, 'Obstetricia'),
(8, 'Urgencias'),
(9, 'Cuidados Intensivos'),
(10, 'Cirugía General'),
(11, 'Urología'),
(12, 'Dermatología'),
(13, 'Endocrinología'),
(14, 'Gastroenterología'),
(15, 'Oftalmología'),
(16, 'Otorrinolaringología'),
(17, 'Psiquiatría'),
(18, 'Reumatología'),
(19, 'Neumología'),
(20, 'Hematología'),
(21, 'Radiología'),
(22, 'Rehabilitación'),
(23, 'Anestesiología');

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
  `fecha_consulta` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consulta`
--

INSERT INTO `consulta` (`id_consulta`, `id_tipo_consulta`, `id_paciente`, `id_usuario`, `estado_paciente`, `motivo_consulta`, `fecha_consulta`) VALUES
(1, 2, 1, 1, 'Estable', 'Dolor en el pecho', '2024-09-20'),
(2, 1, 2, 2, 'Leve', 'Tos persistente', '2024-09-21');

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
  `presion_arterial` float DEFAULT NULL,
  `frecuencia_cardiaca` float DEFAULT NULL,
  `saturacion_oxigeno` float DEFAULT NULL,
  `temperatura` float DEFAULT NULL,
  `peso` float DEFAULT NULL,
  `altura` float DEFAULT NULL,
  `diagnostico` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `examen_fisico` varchar(800) DEFAULT NULL,
  `id_consulta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_consulta`
--

INSERT INTO `detalle_consulta` (`id_detalle_consulta`, `id_estado_consulta`, `motivo_consulta`, `presente_enfermedad`, `antecedentes`, `presion_arterial`, `frecuencia_cardiaca`, `saturacion_oxigeno`, `temperatura`, `peso`, `altura`, `diagnostico`, `observaciones`, `examen_fisico`, `id_consulta`) VALUES
(1, 2, 'Dolor en el pecho', 'Paciente refiere dolor desde hace 2 días', 'Hipertensión', 140, 80, 95, 37, 80, 1.75, 'Angina de pecho', 'Recomendar reposo', 'Examen de tórax normal', 1),
(2, 2, 'Tos persistente', 'Paciente con tos desde hace 1 semana', 'Asma infantil', 120, 75, 97, 36.5, 60, 1.65, 'Bronquitis leve', 'Recetar broncodilatadores', 'Examen respiratorio normal', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id_especialidad` int(11) NOT NULL,
  `nombre_especialidad` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id_especialidad`, `nombre_especialidad`) VALUES
(1, 'Cardiología'),
(2, 'Pediatría'),
(3, 'Dermatología'),
(4, 'Neurología'),
(5, 'Oncología'),
(6, 'Ortopedia'),
(7, 'Ginecología'),
(8, 'Obstetricia'),
(9, 'Urgencias'),
(10, 'Cuidados Intensivos'),
(11, 'Cirugía General'),
(12, 'Urología'),
(13, 'Endocrinología'),
(14, 'Gastroenterología'),
(15, 'Oftalmología'),
(16, 'Otorrinolaringología'),
(17, 'Psiquiatría'),
(18, 'Reumatología'),
(19, 'Neumología'),
(20, 'Hematología'),
(21, 'Radiología'),
(22, 'Rehabilitación'),
(23, 'Anestesiología');

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
  `id_detalle_consulta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_medico`
--

INSERT INTO `historial_medico` (`id_historial_medico`, `descripcion_his_medico`, `fecha`, `id_detalle_consulta`) VALUES
(1, 'Paciente con antecedentes de hipertensión', '2024-09-20', 1),
(2, 'Paciente con historial de asma infantil', '2024-09-21', 2);

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
  `responsable_parentesco` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `n_expediente`, `nombre_paciente`, `apellido_paciente`, `fecha_nacimiento_paciente`, `dui_paciente`, `sexo_paciente`, `telefono_paciente`, `direccion_paciente`, `contactoE_nombre`, `contactoE_telefono`, `contactoE_parentesco`, `responsable_nombre`, `responsable_dui`, `responsable_telefono`, `responsable_parentesco`) VALUES
(1, 'EXP12345', 'Juan', 'Pérez', '1985-04-23', '01234567-8', 'M', '77889900', 'Calle 123, Ciudad', 'María Pérez', '77889911', 'Hermana', 'José Pérez', '01234567-9', '77889922', 'Padre'),
(2, 'EXP12346', 'Ana', 'López', '1992-09-10', '98765432-1', 'F', '66554433', 'Avenida 45, Ciudad', 'Pedro López', '66554434', 'Hermano', 'Juana López', '98765432-2', '66554435', 'Madre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(250) DEFAULT NULL,
  `cargo` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`, `cargo`) VALUES
(1, 'Administrador', 'Administrador del sistema'),
(2, 'Médico', 'Especialista médico'),
(3, 'Enfermero', 'Enfermero');

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
(4, 'Marta', 'Vásquez', '22334455-6', '66778899', 'marta.vasquez@example.com', 'martaV123', 'Calle Tercera 321, Ciudad', '1990-09-22', 'F', '321-54-9876', 'activo', 3, NULL, 3);

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
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `consulta`
--
ALTER TABLE `consulta`
  MODIFY `id_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `detalle_consulta`
--
ALTER TABLE `detalle_consulta`
  MODIFY `id_detalle_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `estado_consulta`
--
ALTER TABLE `estado_consulta`
  MODIFY `id_estado_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  MODIFY `id_historial_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_consulta`
--
ALTER TABLE `tipo_consulta`
  MODIFY `id_tipo_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
