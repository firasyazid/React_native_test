import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Types/types';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface DetailScreenProps {
  route: RouteProp<RootStackParamList, 'Detail'>;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { pokemon } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome5 name="arrow-left" size={24} color="#3691cb" />
      </TouchableOpacity>
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.type}>Type: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}</Text>

       <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Statistics:</Text>
        {pokemon.stats && pokemon.stats.map((stat, index) => (
          <Text key={index} style={styles.stat}>
            {stat.stat.name}: {stat.base_stat}
          </Text>
        ))}
      </View>

       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f9f9f9',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  type: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  sectionContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3691cb',
    marginBottom: 10,
    alignSelf: 'center',
  },
  stat: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
    textAlign: 'center',
  },
  ability: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
    textAlign: 'center',
  },
});

export default DetailScreen;
