const express = require('express')
const mongoose = require('mongoose')
const  reviewsModel = require('../models/reviewsModel');
const router = express.Router()
///

//                              URI REVIEWS

//LISTAR TODOS
router.get('/' ,async(request , response)=> { 
    try{
        const reviews = await reviewsModel.find()
        if (reviews.length === 0) {
            return response
            .status(404)
            .json({
                sucess: false,
                msg:"No hay reviews disponibles"
            })
        }
        response
        .status(200)
        .json({
            "sucess": true,
            "results":reviews
        })

    }catch(error){
            response
            .status(500)
            .json({
                sucess: false,
                msg: "Error interno del servidor"
    })
        }
});

//LISTAR ID
router.get('/:id', async(request,response)=>{
    try{
        const reviewId = request.params.id
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            response
            .status(500)
            .json({
                sucess: true,
                msg: `El id ${reviewId} no es valido`
        })
        }else{

        const select_reviewId = await reviewsModel.findById(reviewId)
        //Condicion IF
        if (!select_reviewId) {
            return response.status(404).
            json({
                sucess: false,
                msg: `No hay review con el id: ${reviewId}` 
            })
        }//cierre condicion IF
        //Condicion else
        else{
        response
            .status(200)
            .json({
                "sucess": true,
                "results": select_reviewId
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

//ENVIAR DATO
router.post('/', async(request,response)=>{
    try{
        //crear el nuevo 
        const review= await reviewsModel.create(request.body)
        response
        .status(201)
        .json({
            "sucess": true,
            "data": review
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
    reviewId= request.params.id
    const updReview = 
    await reviewsModel.findByIdAndUpdate(
    reviewId,request.body,
    { new: true })
    response
    .status(200)
    .json({
        "sucess": true,
       "results": updReview
    })
});

//ELIMINAR DATO POR ID 
router.delete('/:id', async (request,response)=>{
    reviewId= request.params.id
    await reviewsModel.findByIdAndDelete(reviewId)
    response
    .status(200)
    .json({
        "sucess": true,
        "results": []
    })
});

module.exports = router
