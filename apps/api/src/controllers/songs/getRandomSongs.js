import asyncHandler from "../../methods/async-function.js";
import pool from "../../db.js";
export const getRandomSongs = asyncHandler(async (req, res, next) => {
     const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const { num } = req.params;
 
  const rows = await pool.query(
  `SELECT 
      Tracks.id, 
      duration, 
      track_name, 
      src, 
      cover_image,
      display_name AS artist_name, 
      Artists.id AS artist_id 
   FROM 
      Tracks 
   LEFT JOIN 
      Artists 
   ON 
      Tracks.user_id = Artists.id  
   ORDER BY RAND() 
   LIMIT ?`,
  [parseInt(num)] 
);
  res.status(200).send({ success: true, data: rows });
});
export const getTracksOfArtist = asyncHandler(async (req, res, next) => {
    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const { id } = req.params;
  const { page } = req.query;
  const  rows  = await pool.query(
  `SELECT 
      Tracks.id, 
      duration, 
      track_name, 
      src, 
      cover_image,
      display_name AS artist_name, 
      Artists.id AS artist_id 
   FROM 
      Tracks 
   LEFT JOIN 
      Artists 
   ON 
      Tracks.user_id = Artists.id 
   WHERE 
      Tracks.user_id = ? 
   LIMIT ?, 20`,
  [parseInt( (page ?? 0) * 20 ), id]  // Offset calculado y user_id como parámetro
);
  res.status(200).send({ success: true, data: rows });
});
export const getTracksOfTag = asyncHandler(async (req, res, next) => {
    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const { name } = req.params;
  const { page } = req.query;
  const  rows  = await pool.query(
  `SELECT 
      Tracks.id, 
      duration, 
      track_name, 
      src, 
      cover_image,
      display_name AS artist_name, 
      Artists.id AS artist_id 
   FROM 
      Tracks 
   LEFT JOIN 
      Artists 
   ON 
      Tracks.user_id = Artists.id 
   WHERE 
      ? IN (Tracks.tags) 
   LIMIT ?, 20`,
  [name, parseInt( (page ?? 0) * 20)]  // name para la comparación y el offset calculado
);

  res.status(200).send({ success: true, data: rows });
});
