const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes")
const rolRoutes = require("./routes/rolRoutes");

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
}));

// Rutas
app.use("/auth", authRoutes);
app.use("/pacientes", pacienteRoutes);
app.use("/roles", rolRoutes);

// Iniciar servidor
app.listen(8081, () => {
    console.log("Conexión exitosa en el puerto 8081");
});
