// Interfaz principal para álbumes
export interface Album {
    idcre: number;     // ID único del álbum (nuevo campo numérico)
    creid: string;     // ID único usado para el reproductor (string)
    titulo: string;    // Título del álbum
    anio: string | null; // Año del álbum (puede ser nulo)
    barcode: string | null; // Código de barras (puede ser nulo)
    cdtracks: number;  // Número de pistas en el CD
    agregado: number;  // Estado de agregado
    artist_id: string; // ID del artista
}

// Interfaz para la respuesta de la API de álbumes
export interface AlbumResponse {
    success: boolean;
    data: Album[];
}

// Función auxiliar para transformar datos de la API a formato de álbum
export const transformarDatosAlbum = (album: any[]): Album[] => {
    return album.map((album: any) => ({
        idcre: album.idcre || 0,
        creid: album.creid || "",
        titulo: album.titulo || "",
        anio: album.anio,
        barcode: album.barcode,
        cdtracks: album.cdtracks || 0,
        agregado: album.agregado || 0,
        artist_id: album.artist_id || ""
    }));
};