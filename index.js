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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})