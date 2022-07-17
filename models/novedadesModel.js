var pool = require('./bd');

async function getNovedades(){
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;

}

async function insertNovedades(obj){
    try{
        var query ='insert into novedades set ?';
        var rows = await pool.query(query,[obj]);
        return rows;

    }catch(error){
        comsole.log(error);
        throw error;//definir el error que va a ir por dos caminos. Tienen qu estar todos los campos completos
    }
}

async function deleteNovedadByID(id){
    var query = 'delete from novedades where id= ?';
    var rows = await pool.query(query,[id]);
    return rows;
}

/*traer la novedad dentro del form*/
async function getNovedadesByID(id){
    var query = 'select * from novedades where id= ?'
    var rows = await pool.query //modo de pasar los datos pool.query, definido en bd.js
    (query, [id]);
    return rows[0]; //el [0] es para asegurar queva a traer un solo id
}

/*query del update*/
async function modificarNovedadByID(obj,id){
    try{
      var query = 'update novedades set ? where id=?'
      var rows = await pool.query(query,[obj,id]);
      return rows;  
    }catch(error){
        console.log(error)
        throw error;
    }


}

module.exports = { getNovedades, insertNovedades, deleteNovedadByID, getNovedadesByID, modificarNovedadByID }