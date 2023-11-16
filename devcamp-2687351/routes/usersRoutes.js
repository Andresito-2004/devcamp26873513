const express = require('express')
const userModel = require('../models/UsersModel');
const UsersModel = require('../models/UsersModel');
const router = express.Router()

router.post('/register', async (request, response) => {
    try {
        const user = await userModel.create(request.body)
        response
            .status(201)
            .json({
                succes: true,
                data: "usuario registrado",
                token: user.ObtenerJWT()
            })
    }
    catch(error) {
        response
            .status(400)
            .json({
                succes: false,
                msg: error.message
            })
    }

})




router.post('/login', async (request, response) => {
    const { email,password } = request.body;
    //Validación de que lleguen los datos
    if (!email || !password) {
        response
        .status(400)
        .json({
            succes: false,
            msg: "Debe ingresar email o password"
        })
    }else{
        try{
            const user = await  UsersModel.findOne({email}).select("+password")
            //console.log(user)
            if (!user) {
                response
                .status(400)
                .json({
                    succes: false,
                    msg: "no se encontro el usuario"
                })
            }else{
                    const isMatch = await user.comparePassword(password)
                    if (!isMatch) {
                        response
                            .status(400)
                            .json({
                                succes: false,
                                msg: "contraseña incorrecta"
                             })
                    }else{
                        response
                            .status(200)
                            .json({
                                succes: true,
                                msg: "contraseña correcta"
                            })
                    }
            }
        }catch(error){
            
        }
    }

})


module.exports = router
