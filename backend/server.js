const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const  cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
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
        maxAge: 1000 * 60 * 60 * 24
    }
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hospital_unicaes"
})


app.post('/login', (req, res) => {
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
            console.log('Usuario autenticado:', req.session.user); 
            return res.status(200).json({
                message: "Success",
                user: req.session.user
            });
        } else {
            return res.status(401).json({ message: "Fail" });
        }
    });
});



app.get('/user', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ user: req.session.user });
    } else {
        return res.status(401).json({ message: "No hay sesión activa" });
    }
});



app.listen(8081, ()=>{
    console.log("Conexion exitosa")
})