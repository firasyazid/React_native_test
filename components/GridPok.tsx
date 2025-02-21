import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, RefreshControl, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPokemonData } from '../services/pokemonService';

interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

interface GridPokProps {
  searchQuery: string;
}

const GridPok: React.FC<GridPokProps> = ({ searchQuery }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const itemsPerPage = 4;

  const fetchPokemon = async () => {
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
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPokemon();
  };

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(pokemonList.length / itemsPerPage) || loading) return;
    setPage(newPage);
  };

  const displayedPokemon = pokemonList
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#96e6a1" />
      ) : (
        <>
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
                colors={["#6A80B9"]}
                tintColor="#96e6a1"
              />
            }
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={styles.row}
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
        </>
      )}
    </View>
  );
};

export default GridPok;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  row: {
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
    fontFamily: 'Parkinsans',
    marginTop: 2,
  },
  paginator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    top: -50,
  },
  paginatorButton: {
    padding: 10,
  },
  paginatorText: {
    fontSize: 13,
    color: "#3691cb",
  },
});
