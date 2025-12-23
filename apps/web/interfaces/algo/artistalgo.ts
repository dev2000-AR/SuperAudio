export interface Artists {
  id: number;
  username: string;
  display_name: string;
  avatar: Avatar;
}

export interface Avatar {
  url: string;
  color: string;
}

export const tracksToArtists = (tracks: any[]): Artists[] => {
  return tracks.map((track: any) => {
    let avatarObj: Avatar = { url: "", color: "" };

    try {
      avatarObj = track.avatar ? JSON.parse(track.avatar) : { url: "", color: "" };
    } catch (error) {
      console.error("Error parsing avatar JSON:", error);
    }

    return {
      id: track.id, // Asignamos el id del artista
      username: track.username || "", // Si no está presente, usamos un valor por defecto
      display_name: track.display_name, // Nombre a mostrar del artista
      avatar: {
        url: avatarObj.url || "",
        color: avatarObj.color || "#000000",
      },
    };
  });
};