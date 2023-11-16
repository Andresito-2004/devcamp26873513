const express = require('express')
const mongoose = require('mongoose')
const  coursesModel = require('../models/coursesModel');
const router = express.Router()
///


//                              URI COURSES

//LISTAR TODOS
router.get('/', async(request,response)=>{
    try{
        const courses = await coursesModel.find()
        if (courses.length === 0) {
            return response
            .status(404)
            .json({
                sucess: false,
                msg:"No hay cursos disponibles"
            })
        }
        response
        .status(200)
        .json({
            "sucess": true,
            "results":courses
        })
    }catch(error){
            response
            .status(500)
            .json({
                sucess: false,
                msg: "Erro interno del servidor "
            })
    }
});
//LISTAR ID
router.get('/:id', async(request,response)=>{
    try{
        const courseId = request.params.id
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            response
            .status(500)
            .json({
                sucess: true,
                msg: `El id ${courseId} no es valido`
        })
        }else{

        const select_courseId = await coursesModel.findById(courseId)
        //Condicion IF
        if (!select_courseId) {
            return response.status(404).
            json({
                sucess: false,
                msg: `No hay bootcamps con el id: ${courseId}` 
            })
        }//cierre condicion IF
        //Condicion else
        else{
        response
            .status(200)
            .json({
                "sucess": true,
                "results": select_courseId
        })
        }// fin else 
    }// cierre el else 
    }catch(error){
        response
        .status(500)
        .json({
            sucess: false,
            msg: "Error interno del servidor"
})
    }
});



//ENVIAR DATO
router.post('/', async(request,response)=>{
    try{
        //crear el nuevo bootcamp
        const course= await coursesModel.create(request.body )
        response
        .status(201)
        .json({
            "sucess": true,
            "data": course
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
    courseId= request.params.id
    const updCourse = 
    await coursesModel.findByIdAndUpdate()
    courseId,request.body,
    {   new: true   }
    response
    .status(200)
    .json({
        "sucess": true,
       "results": updCourse
    })
});
//ELIMINAR DATO POR ID 
router.delete('/:id', async (request,response)=>{
    courseId= request.params.id
    await coursesModel.findByIdAndDelete(courseId)
    response
    .status(200)
    .json({
        "sucess": true,
        "results": []
    })
});

module.exports = router
