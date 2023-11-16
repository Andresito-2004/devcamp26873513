const mongoose = require('mongoose')
//definir modelo de bootcamps

const bootcampsSchema= mongoose.Schema({
    name:{
        type:String,
        unique: [true,"nombre de bootcamp debe ser único"],
        requiered:[true,"nombre de bootcamp requerido"],
        maxlegenth: [50," longitud menos a 50"]
    },
    phone:{
        type: Number,
        maxlegenth: [10," longitud menos a 50"]
    },
    address:{
        type:String,
        requiered:[true,"dirección requerida"],
    },
    topics:{
            type:[ String ],
            enum:[
                "AI",
                "FRONTEND/UX",
                "DevOps"
            ]
    },
    AverageRaing: Number,
    createdAt: Date


})

module.exports=mongoose.model('Bootcamp', bootcampsSchema)