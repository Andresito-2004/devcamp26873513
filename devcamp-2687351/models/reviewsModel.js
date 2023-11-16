//Conexion a mongose
const mongoose = require('mongoose')
//Definir el modelo review 
const reviewSchema = mongoose.Schema({ 
    title:{
        type: String,
        requiered:[true,"titulo requerido"],
        maxlegenth: [20," longitud maxima a 20"]
    },
    text:{
        type: String,
        requiered:[true,"Descripcion requerida"],
        maxlegenth: [50," longitud maxima a 50"]
    },
    rating:{
        type: Number,
        requiered:[true,"campo requerido"],
        min:1,
        max:10
    }
})

module.exports=mongoose.model('reviews', reviewSchema)