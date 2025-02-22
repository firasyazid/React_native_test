import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import GridPok from '../components/GridPok';
import debounce from 'lodash.debounce';

const HomeScreen = () => {
  const [inputValue, setInputValue] = useState('');  
  const [searchQuery, setSearchQuery] = useState('');  

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearchQuery(text);
    }, 300),
    []
  );

  const handleSearchChange = (text: string) => {
    setInputValue(text);
    debouncedSearch(text);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/pikachu.png')}
            resizeMode="contain"

          />
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name..."
            value={inputValue}
            onChangeText={handleSearchChange}
          />
        </View>
        <View style={styles.grid}>
          <GridPok searchQuery={searchQuery} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  search: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  grid: {
    flex: 1,
  },
});