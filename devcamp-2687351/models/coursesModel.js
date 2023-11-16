//Conexion a mongose
const mongoose = require('mongoose')
//Definir el modelo 

const coursesSchema = mongoose.Schema({
    title:{
        type: String,
        minlegenth: [10," longitud minima de 10"],
        maxlegenth: [30," longitud menos a 30"]
    },
    description:{
        type: String,
        requiered:[true,"Descripcion requerida"],
        minlegenth: [10," longitud minima de 10"]
    },
    weeks:{
        type: Number,
        requiered:[true,"Numero de semanas requeridas"],
        max: [9,"Maximo 9 semanas para el curso"]
    },
    enroll_cost:{
        type:[ String ],
            enum:[
                "Beginner",
                "Intermediate",
                "Advanced",
                "Expert"
            ]
    }
})
module.exports=mongoose.model('Courses', coursesSchema)