const {dbConnection}  = require('./database/config');
const express = require('express')
const cors = require('cors')
require('dotenv').config();


dbConnection({
  connectionString: process.env.MONGO_CONNECTIONSTRING
});

const app = express()
app.use(cors())
const port = process.env.PORT

app.get('/', (req, res) => {
  res.json({msg: 'this is CORS-enabled for all origins!'})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})