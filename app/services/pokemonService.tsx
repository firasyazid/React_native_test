import axios from 'axios';

export const fetchPokemonData = async (page: number) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${(page - 1) * 50}`);
    const results = await Promise.all(
      response.data.results.map(async (item: { url: string; name: string; }) => {
        const pokemonResponse = await axios.get(item.url);
        return {
          name: item.name,
          url: item.url,
          sprites: pokemonResponse.data.sprites,
          types: pokemonResponse.data.types,
          stats: pokemonResponse.data.stats,
         };  
      })
    );
    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
