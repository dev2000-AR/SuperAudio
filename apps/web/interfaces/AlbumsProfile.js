
// Añadir esta interfaz al inicio del archivo
export interface ArtistProfileProps {
  success: boolean;
  data: Artists | null;
  album: AlbumDetails[];
  tracks: TrackProps[];
  counts: number;
}

// Interfaz para la imagen/avatar del álbum
export interface AlbumImage {
    url: string;
    color: string;
}

// Interfaz para una canción/track individual
export interface AlbumTrack {
    id: number;
    creid: string;
    titulo: string;
    artist_id: string;
    artist_name: string;
    album_id: string;
    album_name: string;
    duration: number;
    track_number: number;
    plays?: number;
    is_playing?: boolean;
    is_active?: boolean;
}

// Interfaz principal para el álbum
export interface AlbumDetails {
    idcre: number;           // ID único del álbum
    creid: string;          // ID de referencia del álbum
    titulo: string;         // Título del álbum
    anio: string | null;    // Año de lanzamiento
    barcode: string | null; // Código de barras
    cdtracks: number;       // Número de pistas
    agregado: number;       // Estado de agregado
    artist_id: string;      // ID del artista
    artist_name?: string;   // Nombre del artista (opcional)
    tracks?: AlbumTrack[];  // Lista de canciones (opcional)
    image?: AlbumImage;     // Imagen del álbum (opcional)
}

// Interfaz para la respuesta de la API
export interface AlbumResponse {
    success: boolean;
    data: AlbumDetails[];
}

// Interfaz para los props del componente AlbumProfile
export interface AlbumProfileProps {
    success: boolean;
    data: AlbumDetails | null;
    tracks: AlbumTrack[];
}

// Interfaz para el estado del reproductor
export interface PlayerState {
    isPlaying: boolean;
    activeSong: AlbumTrack;
    playingPlaylist: string | number;
}

// Interfaz para las acciones del reproductor
export interface PlayerAction {
    type: string;
    payload: {
        tracks?: AlbumTrack[];
        index?: number;
        playlist?: string | number;
        isPlaying?: boolean;
    };
}

// Helper function para generar la URL de la imagen del álbum
export const getAlbumImageUrl = (artist_id: string, creid: string): string => {
    return `https://datab.superaudio.online/cover/${artist_id}/${creid}`;
};

// Helper function para formatear la duración
export const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Constantes para tipos de acciones del reproductor
export const PlayerActionTypes = {
    SET_ACTIVE_SONG: 'SET_ACTIVE_SONG',
    PLAY_PAUSE: 'PLAY_PAUSE',
    NEXT_SONG: 'NEXT_SONG',
    PREV_SONG: 'PREV_SONG',
} as const;

// Tipo para los estados de error
export type ErrorState = {
    hasError: boolean;
    message?: string;
};

// Helper function para validar los datos del álbum
export const validateAlbumData = (data: any): data is AlbumDetails => {
    return (
        typeof data === 'object' &&
        data !== null &&
        typeof data.idcre === 'number' &&
        typeof data.creid === 'string' &&
        typeof data.titulo === 'string' &&
        typeof data.cdtracks === 'number' &&
        typeof data.artist_id === 'string'
    );
};

// Valores por defecto para un álbum vacío
export const DEFAULT_ALBUM: AlbumDetails = {
    idcre: 0,
    creid: '',
    titulo: '',
    anio: null,
    barcode: null,
    cdtracks: 0,
    agregado: 0,
    artist_id: '',
};

// Tipo para los estados de carga
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';