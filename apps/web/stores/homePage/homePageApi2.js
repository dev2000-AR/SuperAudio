import axios from "axios";
import API_URL from "@/configs/apiUrl";

// Register user
const getRandomArtists = async (page: number = 1) => {
  try {
    const response = await axios.all([
      axios.get(`${API_URL}/artists/random/150?page=${page}`),
      axios.get(`${API_URL}/songs/random/150?page=${page}`),
    ]);

    return {
      randomArtists: response[0].data.data.slice(0, 50),
      trendingArtists: response[0].data.data.slice(50, 100),
      topArtists: response[0].data.data.slice(100, 150),
      topHits: response[1].data.data.slice(0, 50),
      popularHits: response[1].data.data.slice(50, 100),
      recentSongs: response[1].data.data.slice(100, 150),
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