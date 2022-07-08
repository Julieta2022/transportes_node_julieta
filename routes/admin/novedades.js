var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.render('admin/novedades',{
        layout:'admin/layout',//admin/layout.hbs
        persona: req.session.nombre //le paso una propiedad q en este caso esta almacenando el nombre (Flavia)
    });//view/admin/novedades.hbs
}); //cierro el GET

module.exports = router;