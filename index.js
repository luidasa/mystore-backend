const {dbConnection}  = require('./database/config');
const express = require('express')
const cors = require('cors')
require('dotenv').config();


dbConnection({
  connectionString: process.env.MONGO_CONNECTIONSTRING
});

const app = express()
const port = process.env.PORT

// cors es una filtro que se ejecuta en cada petición.
app.use(cors())           

// lectura y parseo del body
app.use(express.json())

// Cualquier petición que comience con /api/usuarios va a ser respondido por el require que esta en el archivo
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/buscar', require('./routes/busquedas.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/upload', require('./routes/uploads.route'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})