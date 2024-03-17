// node server.js

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mysql from 'mysql2';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const PORT = 5500;

//Conexión a MySql
let connection = mysql.createPool({
  host: 'localhost',
  database: 'explorecost',
  user: 'root',
  password: 'Walter.pipon1'
})

// Configuración de captura de datos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexión a login
app.post("/validar", async function (req, res) {

  const capture = req.body;

  let email = capture.email;
  let password = capture.password;

  if (!email) {
    console.log('Email Inválido')
    return
  } if (!password) {
    console.log('Contraseña Inválida');
    return
  }

  const login = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

  connection.query(login, [email, password], (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
      res.json({ success: false, error: 'Error en el servidor' });
      return;
    }

    if (results.length > 0) {
      // El usuario existe, puedes hacer algo aquí, como iniciar sesión
      res.json({ success: true, message: 'Usuario válido' });
    } else {
      // El usuario no existe
      res.json({ success: false, error: 'Usuario no registrado' });
    }
  });
});

app.post("/registro", async function (req, res) {
  const capture = req.body;

  let email = capture.email;
  let password = capture.password;
  let nombre = capture.nombre;
  let apellido = capture.apellido;
  let rubro = capture.rubro;
  let direccion = capture.direccion;
  let codigoPostal = capture.codigoPostal;
  let telefono = capture.telefono;
  let movil = capture.movil;
  let roi = capture.roi;
  let iva = capture.iva;

  if (!email || !password || !nombre || !apellido || rubro === 'Elija su rubro...' || !direccion || !codigoPostal || !telefono || !movil || !roi || !iva) {
    res.status(400).json({ success: false, message: 'Datos incompletos', status: 400 });
    return;
  };

  const validation = 'SELECT email FROM usuarios WHERE email = ?';

  connection.query(validation, email, (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error en el servidor', status : 500 });
      return;
    } else if (results.length > 0) {
      // Usuario ya existe
      res.status(409).json({ success: false, message: 'El usuario ya está registrado', status : 409 });
      return;
    } else if(results.length === 0) {
      // El email está disponible
      const register = 'INSERT INTO usuarios (email, password, nombre, apellido, rubro, direccion, codigoPostal, telefono, movil, roi, iva) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

      connection.query(register, [email, password, nombre, apellido, rubro, direccion, codigoPostal, telefono, movil, roi, iva], (err, results) => {
        if (err) {
          console.error('Error al realizar la consulta:', err);
          res.status(500).json({ success: false, message: 'Error interno del servidor al registrar el usuario', status : 500 });
        } else {
          res.status(200).json({ success: true, message: 'Usuario registrado correctamente', status: 200 });
        }
      });
    }
  });


});



// Configuración para servir archivos estáticos desde la carpeta
app.use(express.static(join(__dirname, 'public')));

// Configuración de otras rutas si es necesario
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
