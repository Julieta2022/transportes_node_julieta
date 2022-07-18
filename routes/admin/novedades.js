var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/*diseño y listado de novedades*/
router.get('/', async function(req,res,next){
   // var novedades = await novedadesModel.getNovedades(); queda comentado por la clase n° 42 donde agregamos la funcionalidad de buscador..se aplica lo q sigue

   var novedades
   if(req.query.q === undefined){
    novedades = await novedadesModel.getNovedades();
    }else{
        novedades = await novedadesModel.buscarNovedades(req.query.q);

    } //los tres = significa que tiene que ser igual en tipo y valor. La q (solita) viene del name que le pusimos al input en novedades.hbs del buscador

    res.render('admin/novedades',{
        layout:'admin/layout',//admin/layout.hbs
        persona: req.session.nombre,
        novedades, //le paso una propiedad q en este caso esta almacenando el nombre (Flavia)
        q: req.query.q,
        is_search: req.query.q !== undefined //en caso que no haya resultado en la busqueda, tendría que pasar un mensaje de que no se encontró la busqueda
    });//view/admin/novedades.hbs
}); //cierro el GET

// funciones de flecha => o poner function, es lo mismo escribir la palabra function antes de los parámetros o poner la flechita después de los parámetros
//esto sirve para dar de alta las novedades desde la página
router.get('/agregar',(req,res,next) => {
    res.render('admin/agregar',{ //agregar.hbs
        layout: 'admin/layout'

    })
})

/*agregar la novedad*/
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

/*eliminar la novedad*/
router.get('/eliminar/:id', async (req,res,next) => {
    //console.log(req.params.id);
    var id = req.params.id;
    await novedadesModel.deleteNovedadByID(id);
    res.redirect('/admin/novedades')
}) 

/*vista modificar (form) + los datos de campospara modificar*/

router.get ('/modificar/:id', async(req,res,next) =>{
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesByID(id);
    // console.log(novedad)
    res.render('admin/modificar',{
        layout:'admin/layout',
        novedad
    })
})

/*actualización de los datos al modificar*/
router.post('/modificar', async(req,res,next)=>{
    try{
        var obj = {
            titulo:req.body.titulo,
            subtitulo:req.body.subtitulo,
            cuerpo:req.body.cuerpo
        }
        
        await novedadesModel.modificarNovedadByID(obj, req.body.id);
        res.redirect('/admin/novedades');
    }catch(error){
        console.log(error)
        res.render('admin/modificar',{
        layout:'admin/layout',
        error:true,
        message:'No se modifico la novedad'
        })

    }

})


module.exports = router;