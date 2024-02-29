//Libreria mysql
import {createPool} from "mysql2/promise";

//Configuración de la conexión con la base de datos
const pool = createPool({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'reportes'
});
  
//Exportar funciones
export default pool;