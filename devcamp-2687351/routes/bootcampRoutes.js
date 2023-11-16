const express = require('express')
const mongoose = require('mongoose')
const  bootcampModel = require('../models/bootcampsModels');
const router = express.Router()

//                              URI BOTCAMPS

//LISTAR TODOS
router.get('/' ,async(request , response)=> { 
    try{
        const bootcamps = await bootcampModel.find()
        if (bootcamps.length === 0) {
            return response
            .status(404)
            .json({
                sucess: false,
                msg:"No hay bootcamps disponibles"
            })
        }
        response
        .status(200)
        .json({
            "sucess": true,
            "results":bootcamps
        })

    }catch(error){
            response
            .status(500)
            .json({
                sucess: false,
                msg: "Erro interno del servidor "
    })
            

        }
    //Trae todos los registros (Investigar mas sobre await)
   
});
//LISTAR ID
router.get('/:id', async(request,response)=>{
    try{
        const bootcampId = request.params.id
        if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
            response
            .status(500)
            .json({
                sucess: true,
                msg: `El id ${bootcampId} no es valido`
        })
        }else{

        const select_botcampId = await bootcampModel.findById(bootcampId)
        //Condicion IF
        if (!select_botcampId) {
            return response.status(404).
            json({
                sucess: false,
                msg: `No hay bootcamps con el id: ${bootcampId}` 
            })
        }//cierre condicion IF
        //Condicion else
        else{
        response
            .status(200)
            .json({
                "sucess": true,
                "results": select_botcampId
        })
        }// fin else 
    }// cierre el else 
    }catch(error){
        response
        .status(500)
        .json({
            sucess: false,
            msg: "Error interno del servidor "
})
    }
});



//ENVIAR DATO,CREAR BOOTCAMP
router.post('/', async(request,response)=>{
    try{
        //crear el nuevo bootcamp
        const bootcamp= await bootcampModel.create(request.body )
        response
        .status(201)
        .json({
            "sucess": true,
            "data": bootcamp
        })
    }catch(error){
        response
        .status(500)
        .json({
            sucess: false,
            msg: error.message
    })
    }
 
});


//ACTUALIZAR DATO POR ID 
router.put('/:id', async (request,response)=>{
    bootcampId= request.params.id
    const updBootcamp = 
    await bootcampModel.findByIdAndUpdate()
    bootcampId,request.body,
    {   new: true   }
    response
    .status(200)
    .json({
        "sucess": true,
       "results": updBootcamp
    })
});


//ELIMINAR DATO POR ID 
router.delete('/:id', async (request,response)=>{
    bootcampId= request.params.id
    await bootcampModel.findByIdAndDelete(bootcampId)

    response
    .status(200)
    .json({
        "sucess": true,
        "results": []
    })
});

module.exports = router

