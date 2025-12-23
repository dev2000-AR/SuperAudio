import pool from "../../db.js";
import asyncHandler from "../../methods/async-function.js";

export const getLikedTracksId = asyncHandler(async (req, res, next) => {
  const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const  rows  = await pool.query(
  `SELECT track_id FROM Liked WHERE username = ?`,
  [req.username]
);

  const data = rows.map((row) => row.track_id);
  res.status(200).send({ success: true, data: data });
});

export const getLikedTracks = asyncHandler(async (req, res, next) => {
  const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const  rows  = await pool.query(
  `SELECT Tracks.id, duration, track_name, src, cover_image, 
      display_name AS artist_name, Artists.id AS artist_id 
   FROM Tracks 
   LEFT JOIN Artists ON Tracks.user_id = Artists.id 
   WHERE Tracks.id IN (SELECT track_id FROM Liked WHERE username = ?)`,
  [req.username]
);

  res.status(200).send({ success: true, data: rows });
});

export const Like = asyncHandler(async (req, res, next) => {
  const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const { track_id } = req.params;
  const  rows  = await pool.query(
    `insert into public."Liked"(track_id,username) values ($1,$2);`,
    [track_id, req.username]
  );
  res.status(200).send({ success: true, data: rows });
});

export const unLike = asyncHandler(async (req, res, next) => {
  const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const { track_id } = req.params;
  const  rows  = await pool.query(
  `DELETE FROM Liked WHERE track_id = ? AND username = ?`,
  [track_id, req.username]
);

  res.status(200).send({ success: true, data: rows });
});
