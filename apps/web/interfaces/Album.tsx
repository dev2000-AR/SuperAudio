export interface Album {
  id: number;        // ID del álbum
  idcre: string;     // Parece ser un ID único usado en el reproductor
  titulo: string;    // Título del álbum
  cover_image: string; // URL de la imagen de portada
  artist_id: number; // ID del artista
  artist_name: string; // Nombre del artista
}

export interface Artists {
  id: number;
  username: string;
  titulo: string;
  avatar: Avatar;
}

export interface Avatar {
  url: string;
  color: string;
}

export const tracksToAlbums = (albums: any[]) => {
  return albums.map((album: any) => {
    return {
      id: album.id || 0,
      idcre: album.idcre || album.id?.toString() || "",
      titulo: album.titulo || album.title || "",
      cover_image: album.cover_image || "",
      artist_id: album.artist_id || 0,
      artist_name: album.artist_name || "",
    };
  });
};