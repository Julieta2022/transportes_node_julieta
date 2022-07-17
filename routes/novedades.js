var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel'); //para llegar a la query que necesitamos para que novedades de la web interactue con la base de datos

router.get('/', async function(req,res,next){

    var novedades =await novedadesModel.getNovedades();//genere una variable donde tengo la query

    res.render('novedades',{
        isNovedades:true,
        novedades //tengo los registros para poder imprimirlos en el hbs
    });//view/novedades.hbs
})

module.exports = router;