var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/*diseño y listado de novedades*/
router.get('/', async function(req,res,next){
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades',{
        layout:'admin/layout',//admin/layout.hbs
        persona: req.session.nombre,
        novedades //le paso una propiedad q en este caso esta almacenando el nombre (Flavia)
    });//view/admin/novedades.hbs
}); //cierro el GET

// funciones de flecha => o poner function, es lo mismo escribir la palabra function antes de los parámetros o poner la flechita después de los parámetros
//esto sirve para dar de alta las novedades desde la página
router.get('/agregar',(req,res,next) => {
    res.render('admin/agregar',{ //agregar.hbs
        layout: 'admin/layout'

    })

})



module.exports = router;