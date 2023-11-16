//dependencia commontjs
const express  = require('express');
//const dotenv = require('dontev')
const colors = require('colors')
// dependecias de las rutas
const bootcampRoutes = require('./routes/bootcampRoutes.js')
const courseRoutes = require('./routes/courseRoutes.js')
const reviwesRoutes = require('./routes/reviewsRoutes.js')
const userRoutes = require("./routes/usersRoutes.js")

// dependecia de la conexion a la base de datos
const conectDB = require('./config/db.js')
 conectDB()

//crear objeto app
const app = express();

//Dependencia para recibir datos JSON
app.use(express.json())

//vinculacion de rutas
app.use('/api/v1/devcamp/bootcamps',bootcampRoutes)
app.use('/Api/v1/devcamp/courses',courseRoutes)
app.use('/Api/v1/devcamp/reviews',reviwesRoutes)
app.use('/Api/v1/devcamp/auth',userRoutes)


//PRUEBA DE URL DEL SERVIDOR
app.get('/prueba',function(request, response){
    response.send("Hello Word");
});





//                              URI USERS

//LISTAR TODOS
app.get('/Api/v1/devcamp/users',(request,response)=>{
    response
    .status(200)
    .json({
        "sucess": true,
        "msg": "mostrar todos los users"
    })
});
//LISTAR ID
app.get('/Api/v1/devcamp/users/:id',(request,response)=>{
    response
    .status(200)
    .json({
        "sucess": true,
        "msg": `Seleccionado el user con id: ${request.params.id}`
    })
});

//ENVIAR DATO
app.post('/Api/v1/devcamp/users',(request,response)=>{
    response
    .status(201)
    .json({
        "sucess": true,
        "msg": "crear user"
    })
});
//ACTUALIZAR DATO POR ID 
app.put('/Api/v1/devcamp/users/:id',(request,response)=>{
    response
    .status(200)
    .json({
        "sucess": true,
        "msg": `Actualizando el user con id: ${request.params.id}`
    })
});
//ELIMINAR DATO POR ID 
app.delete('/Api/v1/devcamp/users/:id',(request,response)=>{
    response
    .status(200)
    .json({
        "sucess": true,
        "msg": `eliminado el user con id: ${request.params.id}`
    })
});


//Establecer servidor 
const puerto = 4500
app.listen(puerto,
    console.log(`SERVIDOR ESCUCHANDO EL PUERTO: ${puerto}`.bgBlue.green))