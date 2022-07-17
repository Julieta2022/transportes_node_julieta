var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

router.get('/', function(req,res,next){
    res.render('admin/login',{
        layout:'admin/layout'//admin/layout.hbs
    });//view/admin/login.js
}); //cierro el GET

router.get('/logout', function(req,res,next){
    req.session.destroy();//destruye el inicio de sesión (Id, nombre). "req": es pedir el dato de la sesión
    res.render('admin/login',{
        layout:'admin/layout'
    })
})

router.post('/', async function(req,res,next){

    try{
        console.log(req.body);
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await usuariosModel.getUserAndPassword(usuario,password);
        //var data = select * from usuarios where usuario = 'flavia' and password = md5(1234)
        //el select * trae las columnas id, usuario, password 

        //!= significa diferente 
        if(data !=undefined){
            req.session.id_usuario = data.id; //1
            req.session.nombre = data.usuario; //Flavia. respetar el nombre de las columnas que pusimos en la tabla de la base de datos que creamos

            res.redirect('/admin/novedades')
        }else{
            res.render('admin/login',{
                layout:'admin/layout',
                error:true
            })
        }

    }catch(error){
        console.log(error)
    }


});//cierro el POST


module.exports = router;