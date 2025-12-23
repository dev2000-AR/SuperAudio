import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'ricu',
  port: 8889,
  database: 'public',
  password: '123123'
});
const usernamee = 'xear';
const sfsdf = (async () => {
  try {
 
    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
    const rows = await pool.query(
    'SELECT username, passhash FROM Users WHERE username = ?' ,
    [usernamee]
  );
  console.log(rows[0])
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err.message);
  }
});
 export default pool; 