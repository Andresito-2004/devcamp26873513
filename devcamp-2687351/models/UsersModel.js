//Conexion a mongose
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt= require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"nombre requerido"]
    },
    email: {
        type:String,
        required: [true, "Email requerido"],
        match: [ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ , "Email no valido"]
    },
    role: {
        type: String,
        required: [true,"rol requerido"],
        eum:[
            "user",
            "publisher"
        ]
    },
    password: {
        type: String,
        required: [true,"Contraseña requerida"],
        max:6,
        select: false
    },
    createdAt:{
        type:Date,
        defaul: Date.now
    }

})
//encriptar clave
//accion pre
UserSchema.pre('save', async function(next){
    //creat sal, caracteres random
    const sal= await bcryptjs.genSalt(10)
    //encriptar contraseña
    this.password= await bcryptjs.hash(this.password,sal) 

})
//metodo para comparar password del body con la de la entidad(password)
UserSchema.methods.comparePassword= async function(password){
   return await bcryptjs.compare(password, this.password)
}
//metodo que me construye el jwt (token)

//TOKEN PARA EL SERVIDOR 
const JWT_SECRET_KEY= "2687351"
UserSchema.methods.ObtenerJWT = function( ) {
    return jwt.sign({
        id: this._id 
    }, JWT_SECRET_KEY,{
        expiresIn:Date.now() + 10000
    })
}


const user= mongoose.model('User',UserSchema)
module.exports=mongoose.model('users', UserSchema)