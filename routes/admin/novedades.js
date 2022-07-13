var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

router.get('/', async function(req,res,next){
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades',{
        layout:'admin/layout',//admin/layout.hbs
        persona: req.session.nombre,
        novedades //le paso una propiedad q en este caso esta almacenando el nombre (Flavia)
    });//view/admin/novedades.hbs
}); //cierro el GET

module.exports = router;