var pool = require('./bd');

async function getNovedades(){
    var query = 'select * from novedades order by id DESC';
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
        //throw error;//definir el error que va a ir poc dos caminos. Tienen qu estar todos los campos completos
    }

}

module.exports = { getNovedades, insertNovedades }