import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions, StyleSheet } from 'react-native';
 
const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get("window").width;

const BottomTabNavigator = () => {

    const iconStyle = styles.iconStyle;
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={24}
              color={focused ? "white" : "gray"}
              style={iconStyle}
            />
          ),
        }}
      /> 
    
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 10,
    elevation: 2,
    marginLeft: windowWidth * 0.2,
    borderRadius: 50,
    width: windowWidth * 0.58,
    height: 50,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
     shadowOpacity: 0.1,
     shadowRadius: 5,
  },

  iconStyle : {
     marginTop: 5,
  }
});

export default BottomTabNavigator;
