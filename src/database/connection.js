import sql from 'mssql';
import config from '../config'

/*const dbSetting = {
    user: 'luisTali',
    password: 'purposeStudying86',
    server: 'localhost',
    database: 'animals_rest_api_crud',
    port:8686,
    options: {
        encrypt: false, // for azure, servicio en nube de microsoft
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}*/

const dbSetting = {
    user: config.username,
    password: config.password,
    server: 'localhost',
    database: config.database,
    port: Number(config.dbport),
    options: {
        encrypt: false, // for azure, servicio en nube de microsoft
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}
 
//Retorna un pool que usare para realizar mis consultas SQL
export const getConnection = async() =>{
    try {
        const pool = await sql.connect(dbSetting)
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export {sql}