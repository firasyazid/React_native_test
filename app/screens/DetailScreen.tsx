import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Param } from '../Types/types';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface DetailScreenProps {
  route: RouteProp<Param, 'Detail'>;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { pokemon } = route.params;
  const navigation = useNavigation();

  return (
    <View
       style={styles.container}
    >
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <FontAwesome5 name="arrow-left" size={15} color="#ffffff" />
      </TouchableOpacity>
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: pokemon.sprites.front_default }} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.type}>
          Type: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            {pokemon.stats && pokemon.stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.base_stat}</Text>
                <Text style={styles.statName}>{stat.stat.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#3691cb',
    borderRadius: 10,
    padding: 12,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 20,
    elevation: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: '500',
     textTransform: 'capitalize',
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  type: {
    fontSize: 16,
    color: '#666',
    opacity: 0.9,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#3691cb',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    width: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '500',
    color: '#3691cb',
    marginBottom: 5,
  },
  statName: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});

export default DetailScreen;