import React, { useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Image } from 'react-native';
import GridPok from '@/components/GridPok';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../assets/images/pikachu.png')}
          />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name..."
            value={searchQuery}
            onChangeText={handleSearchChange}
            accessibilityLabel="Search for Pokémon by name"
          />
        </View>
        <View style={styles.gridContainer}>
          <GridPok searchQuery={searchQuery} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  logo: {
    width: 70,
    height: 70,
  },
  searchContainer: {
    marginTop: 60,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  gridContainer: {
    flex: 1,
    marginTop: 50,
  },
});
