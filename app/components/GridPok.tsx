import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, RefreshControl, FlatList, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Param } from '../Types/types';
import { fetchPokemonData } from '../services/pokemonService';
import { Pokemon } from '../Types/types';

interface GridPokProps {
  searchQuery: string;
}

const GridPok = React.memo(({ searchQuery }: GridPokProps) => { 
   const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProp<Param>>();

  const itemsPerPage = 4;

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const results = await fetchPokemonData(1);
      setPokemonList(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPokemon();
  }, [fetchPokemon]);



  const changePage = useCallback((newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(pokemonList.length / itemsPerPage) || loading) return;
    setPage(newPage);
  }, [pokemonList, loading]);



  const displayedPokemon = useMemo(() => {
    return pokemonList
      .filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [pokemonList, searchQuery, page]);

  return (
      <View style={styles.container}>
    

          <FlatList
            data={displayedPokemon}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.pokemonCard}
                onPress={() => navigation.navigate('Detail', { pokemon: item })}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.sprites.front_default }}
                    style={styles.pokemonImage}
                  />
                  <Text style={styles.pokemonName}>{item.name}</Text>
                  <Text style={styles.pokemonType}>{item.types[0].type.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#3691cb"]}
               />
            }
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={styles.grid}
          />

      <View style={styles.paginator}>
            <TouchableOpacity
              style={styles.paginatorButton}
              onPress={() => changePage(page - 1)}
              disabled={page === 1 || loading}
            >
              <Text style={styles.paginatorText}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.paginatorText}>Page {page}</Text>
            <TouchableOpacity
              style={styles.paginatorButton}
              onPress={() => changePage(page + 1)}
              disabled={page === Math.ceil(pokemonList.length / itemsPerPage) || loading}
            >
              <Text style={styles.paginatorText}>Next</Text>
            </TouchableOpacity>
        </View>
        
         </View>
  );
});

export default GridPok;

 const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },


  grid: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
  },

  pokemonCard: {
    backgroundColor: "#FBFBFB",
    borderRadius: 14,
    padding: 10,
    alignItems: "center",
    width: '45%',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },



  imageContainer: {
    alignItems: "center",
  },
  pokemonImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },


  pokemonName: {
    fontSize: 14,
    color: "#3691cb",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
  },
  pokemonType: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
     marginTop: 2,
  },
 

   paginator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",  
    borderRadius: 12,  
    marginHorizontal: 8,
     elevation: 2,
     bottom: 60,
    },

  paginatorButton: {
    padding: 10,
  },


  paginatorText: {
    fontSize: 13,
    color: "#3691cb",
  },
});