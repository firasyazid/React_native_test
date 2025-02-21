
import {
    View,
    Image,
    StyleSheet,
    Animated
} from "react-native";
  
const splashscreen = () => {
const imagePosition = new Animated.Value(-100);
Animated.parallel([
    Animated.timing(imagePosition, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }),
    ]).start();

    return (


        <View style={styles.container}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [
                {
                  translateY: imagePosition,
                },
              ],
            },
          ]}
        >
            <Image
                source={require("../assets/images/pikachu.png")}
                style={styles.logo}
            />
        </Animated.View>
        </View>
        
    );
}


const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "white",
    },
    keyboardContainer: {
      flex: 1,
    },
   
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "white",
    },
    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 220,
    },
    logo: {
      width: 230,
      height: 230,
    },
     
    
  });
  
export default splashscreen;