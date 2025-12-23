import axios from "axios";
import API_URL from "@/configs/apiUrl";

// Función para obtener artistas, canciones y álbumes aleatorios con paginación
const getRandomArtists = async (page: number) => {
  try {
    // Definir el número de elementos por página
    const itemsPerPage = 10; // Puedes ajustar este valor según tus necesidades

    // Calcular los índices de inicio y fin para la paginación
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Obtener los datos de la API
    const response = await axios.all([
      axios.get(API_URL + "/artists/random/30"),  // Obtener artistas aleatorios
      axios.get(API_URL + "/songs/random/30"),   // Obtener canciones aleatorias
      axios.get(API_URL + "/albums/random/10"),  // Obtener álbumes aleatorios
    ]);

    // Aplicar paginación a los datos
    return {
      randomArtists: response[0].data.data.slice(startIndex, endIndex),   // Artistas paginados
      trendingArtists: response[0].data.data.slice(6, 16),                // Trending artists (sin paginación)
      topArtists: response[0].data.data.slice(16, 26),                    // Top artists (sin paginación)
      topHits: response[1].data.data.slice(startIndex, endIndex),          // Canciones paginadas
      popular: response[1].data.data.slice(10, 20),                       // Canciones populares (sin paginación)
      randomAlbums: response[2].data.data.slice(0, 6),                    // Álbumes aleatorios (sin paginación)
    };
  } catch (error: any) {
    if (error.response) {
      throw {
        status: error.request.status,
        success: error.response.data.success,
        message: error.response.data.message,
      };
    } else {
      throw error;
    }
  }
};

const homePageApi = { getRandomArtists };

export default homePageApi;