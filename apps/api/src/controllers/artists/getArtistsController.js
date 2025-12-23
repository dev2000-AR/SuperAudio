import pool from "../../db.js";
import asyncHandler from "../../methods/async-function.js";
 
export const getArtistById = asyncHandler(async (req, res, next) => {
    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release()
  const { id } = req.params;
  const  rows  = await pool.query(
  `SELECT id, username, display_name, avatar 
   FROM Artists 
   WHERE id = ?`,
  [id]
);

  res.status(200).send({
    success: true,
    data: rows,
  });
});
export const getRandomArtists = asyncHandler(async (req, res, next) => {

  const { num } = req.params;
  if (parseInt(num) > 50) {
    return res.status(400).send({
      success: true,
      message: "You can only get 50 or less than 50 artists with one request.",
    });
  }
  const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release()
  const  rows  = await pool.query(
    `select id,username,display_name,avatar
       from Artists order by RAND() limit ?`,
    [parseInt(num)]
  );

  res.status(200).send({
    success: true,
    data: rows,
  });
});

export const getArtistsOfTag = asyncHandler(async (req, res, next) => {
  const { name } = req.params;
  const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release()
  const  rows  = await pool.query(
  `SELECT DISTINCT display_name, avatar, Artists.id AS id 
   FROM Tracks 
   LEFT JOIN Artists ON Tracks.user_id = Artists.id 
   WHERE ? IN (tags) 
   LIMIT 20`,
  [name]
);

  res.status(200).send({
    success: true,
    data: rows,
  });
});
