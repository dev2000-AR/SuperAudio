import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import homePageApi from "./homePageApi";
import { Artists } from "@/interfaces/artist";
import { TrackProps } from "@/interfaces/Track";
import { Album } from "@/interfaces/Albumv2";

// Enumerador para los estados de la petición
export enum RequestStatus {
  Loading,
  Error,
  Success,
  Initial,
}

// Definición del estado inicial
export interface HomePageState {
  recentUsers: Artists[];
  trendingArtists: Artists[];
  topArtists: Artists[];
  topHits: TrackProps[];
  popularHits: TrackProps[];
  randomAlbums: Album[];
  status: RequestStatus;
  page: number; // Añadir página al estado
}

const initialState: HomePageState = {
  recentUsers: [],
  topHits: [],
  topArtists: [],
  trendingArtists: [],
  popularHits: [],
  randomAlbums: [],
  status: RequestStatus.Initial,
  page: 1, // Iniciar en la página 1
};

// Creación del slice de la página principal
const homePageSlice = createSlice({
  name: "homePage",
  initialState: initialState,
  reducers: {
    reset: () => initialState, // Restablecer el estado inicial
    setPage: (state, action) => {
      state.page = action.payload; // Actualizar la página
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecentUsers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getRecentUsers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        // Concatenar nuevos datos con los existentes
        state.recentUsers = [...state.recentUsers, ...action.payload.randomArtists];
        state.topHits = [...state.topHits, ...action.payload.topHits];
        state.popularHits = [...state.popularHits, ...action.payload.popular];
        state.trendingArtists = action.payload.trendingArtists;
        state.topArtists = action.payload.topArtists;
        state.randomAlbums = action.payload.randomAlbums;
      })
      .addCase(getRecentUsers.rejected, (state) => {
        state.status = RequestStatus.Error;
      });
  },
});

// Acción asincrónica para obtener los artistas y recomendaciones
export const getRecentUsers = createAsyncThunk(
  "homePage/random",
  async (page: number) => {
    const data = await homePageApi.getRandomArtists(page); // Pasar `page` a la API
    return data;
  }
);

// Exportación de las acciones y del reducer
export const { reset, setPage } = homePageSlice.actions;
export default homePageSlice.reducer;