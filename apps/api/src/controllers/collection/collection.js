import pool from "../../db.js";
import asyncHandler from "../../methods/async-function.js";

// 
export const createNewCollection = asyncHandler(async (req, res, next) => {
  //
  if (!req.body.name) {
    return res
      .status(403)
      .send({ success: false, message: "please add body parameter" });
  }
  var coverImage = null;

    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const  rows  = await pool.query(
    `insert into "Collections" (name,username) values ($1,$2) returning *,(select cover_image from "Tracks" 
      where id=(select track_id from "CollectionItems" where collection_id = "Collections".id limit 1)) as cover_image;`,
    [req.body.name, req.username]
  );
  if (req.body.track_id) {
    const cover_image = await pool.query(
      `insert into "CollectionItems" (collection_id,track_id) values ($1,$2) 
      returning (select cover_image->'url' as cover_image from "Tracks" where id=$2);`,
      [rows[0].id, req.body.track_id]
    );
    coverImage = cover_image.rows[0].cover_image;
  }

  res.status(200).send({
    success: true,
    data: rows.map((row) => {
      if (row.cover_image) {
        return {
          id: row.id,
          name: row.name,
          total_tracks: row.total_tracks,
          cover_image: row.cover_image.url,
          color: row.cover_image.color,
        };
      } else {
        return {
          id: row.id,
          name: row.name,
          total_tracks: row.total_tracks,
          cover_image:
            coverImage ??
            "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",

          color: null,
        };
      }
    }),
  });
});

export const getCollectionsList = asyncHandler(async (req, res, next) => {

    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const  rows  = await pool.query(
  `SELECT id, name, total_tracks, 
      (SELECT cover_image 
       FROM Tracks 
       WHERE id = (SELECT track_id 
                   FROM CollectionItems 
                   WHERE collection_id = Collections.id 
                   LIMIT 1)) AS cover_image 
   FROM Collections 
   WHERE username = ?`,
  [req.username]
);


  res.status(200).send({
    success: true,
    data: rows.map((row) => {
      if (row.cover_image) {
        return {
          id: row.id,
          name: row.name,
          total_tracks: row.total_tracks,
          cover_image: row.cover_image.url,
          color: row.cover_image.color,
        };
      } else {
        return {
          id: row.id,
          name: row.name,
          total_tracks: row.total_tracks,
          cover_image:
            "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
          color: "#4b3432",
        };
      }
    }),
  });
});

export const getCollectionInfo = asyncHandler(async (req, res, next) => {

    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const  rows  = await pool.query(
  `SELECT id, name, total_tracks, 
      (SELECT cover_image 
       FROM Tracks 
       WHERE id = (SELECT track_id 
                   FROM CollectionItems 
                   WHERE collection_id = Collections.id 
                   LIMIT 1)) AS cover_image 
   FROM Collections 
   WHERE id = ?`,
  [req.params.id]
);

  res.status(200).send({
    success: true,
    data: rows.map((row) => {
      if (row.cover_image) {
        return {
          id: row.id,
          name: row.name,
          total_tracks: row.total_tracks,
          cover_image: row.cover_image.url,
          color: row.cover_image.color,
        };
      } else {
        return {
          id: row.id,
          name: row.name,
          total_tracks: row.total_tracks,
          cover_image:
            "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
          color: "#4b3432",
        };
      }
    }),
  });
});

export const deleteCollection = asyncHandler(async (req, res, next) => {

    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  await pool.query(`DELETE FROM Collections WHERE id = ?`, [req.params.id]);

  res.status(200).send({ success: true });
});

export const addToCollection = asyncHandler(async (req, res, next) => {
  const { collection_id, track_id } = req.body;

    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  await pool.query(
  `INSERT INTO CollectionItems (track_id, collection_id) VALUES (?, ?)`,
  [track_id, collection_id]
);

  res.status(200).send({ success: true });
});

export const deleteTrackFromCollection = asyncHandler(
  async (req, res, next) => {
    const { collection_id } = req.body;
    const { track_id } = req.body;
  const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
   await pool.query(
  `DELETE FROM CollectionItems WHERE track_id = ? AND collection_id = ?`,
  [track_id, collection_id]
);

    res.status(200).send({ success: true });
  }
);

export const getTrackFromCollection = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
 const [rows] = await pool.query(
  `SELECT Tracks.id, duration, track_name, src, cover_image,
          display_name AS artist_name, Artists.id AS artist_id 
   FROM Tracks 
   LEFT JOIN Artists ON Tracks.user_id = Artists.id 
   WHERE Tracks.id IN (SELECT track_id 
                       FROM CollectionItems 
                       WHERE collection_id = ?)`,
  [id]
);

  res.status(200).send({ success: true, data: rows });
});

export const renameCollection = asyncHandler(async (req, res, next) => {

    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  const { id } = req.params;
  const { name } = req.query;
await pool.query(`UPDATE Collections SET name = ? WHERE id = ?`, [name, id]);


  res.status(200).send({ success: true });
});
