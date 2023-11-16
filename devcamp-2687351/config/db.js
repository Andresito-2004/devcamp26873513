
const mongoose = require('mongoose')

const puerto = process.env.EXPRESS_PORT


//Función de conexión 
async function conectDB(){
    const conm = await mongoose.connect("mongodb://127.0.0.1:27017/devcamp-2687351")
    console.log(`Conectado a Mongo`.bgYellow.green)
}

module.exports= conectDB