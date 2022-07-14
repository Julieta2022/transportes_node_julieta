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

router.post('/agregar', async (req,res,next) => {

    // console.log(req.body) //es para controlar si pasa de la página A a la B

    try{
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "" ){
            await novedadesModel.insertNovedades(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout:'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    }catch(error){
        console.log(error)
        res.render('admin/agregar',{
            layout:'admin/layout',
            error:true,
            message: 'No se carga la novedad' //para cuando cae el servidor y pensamos que la novedad si se cargó, pero en realidad no...esto ayuda a avisar que la novedad no se llegó a cargar
        
        })
    }

})



module.exports = router;