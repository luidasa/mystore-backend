// getting-started.js
const mongoose = require('mongoose');

const dbConnection = async (parameters) => {
    try {
        await mongoose.connect(parameters.connectionString);
        console.log('BD online');
    } catch(err) {
        console.log(err);
        throw new Error('Error a la hora de inicia la bd ver logs');
    }
};
// mongodb+srv://luidasa:R3f0rm4360!@cluster0.oauog.mongodb.net/storedb

module.exports = {
    dbConnection
}