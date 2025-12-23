
export interface TrackProps {
  id: number;
  track_name: string;
  src: CoverImage;
  cover_image: string;
  artist_name: string;
  artist_id: number;
  duration: number; 
}
export interface CoverImage {
  url: string;
  color: string;
}

export const toTrackProps = (tracks: any): TrackProps[] => {
  return tracks.map((track: any) => {
    return {
      id: track.id,
      duration: track.duration || null, // Asigna null si no está presente
      track_name: track.track_name,
      src: track.src,
      cover_image: {
        url: track.cover_image || "", // Si cover_image es una cadena de texto, aseguramos que sea un objeto con url
        color: "#000000", // Valor por defecto si no hay color
      },
      artist_name: track.artista_nombre, // Asegúrate de que esta propiedad esté correctamente mapeada
      artist_id: track.artista_id || track.track_id, // Usa artista_id o track_id como respaldo
    };
  });
};
