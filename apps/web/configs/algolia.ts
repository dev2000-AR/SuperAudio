import algoliasearch from "algoliasearch";

// Configuración del cliente de Algolia
const client = algoliasearch("XLHDMY0KME", "d9c6e5ad3336488e02c65708e896a024");

// Configura múltiples índices
const artistIndex = client.initIndex("artist");
const trackIndex = client.initIndex("tracks");

// Exporta los índices
export { artistIndex, trackIndex };