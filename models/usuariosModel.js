//se cargan las consultas que se van a hacer de la base de datos

var pool = require('./bd');
var md5 = require('md5');

async function getUserAndPassword(user,password) //son parámetros xq estan dentro de paréntesis antes de una función
{
    try {
        var query = 'select * from usuarios where usuario = ? and password = ? limit 1'; //limit 1 significa que si hay mas de un usuario con el mismo nombre, por no estar controlado de otra manera, que traiga solo 1
        var rows = await pool.query(query,[user,md5(password)]);
        return rows [0];

    } catch (error) {
        console.log(error);

    }
} 

module.exports = { getUserAndPassword }

//genero una funcion que es asincrónica, xq no se en q momento el usuario va a cargar sus datos.
//try - catch : ayuda con el manejo de error a través de la consola
// el select busca siempre una array de elementos, se usa limit 1 y return rows [0], para que traiga solo 1 