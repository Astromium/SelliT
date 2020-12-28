import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-community/async-storage'
import AuthNavigator from './navigation/AuthNavigator'
import HomeNavigator from './navigation/HomeNavigator'
import TabNavigator from './navigation/TabNavigator'
import AuthContext from './context/AuthContext'


const fetchFont = async () => {
  return Font.loadAsync({
    //SourceSansPro: require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "SourceSansPro-Bold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
    "Livvic-Regular": require("./assets/fonts/Livvic-Regular.ttf")
    //"SourceSansPro": require("./assets/fonts/SourceSansPro-Regular.ttf"),
  });
};



export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      setUser(JSON.parse(user))
    } catch (err) {
      console.log(err);
      setUser(null)
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const onAuth = async (user) => {
    setUser(user);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem("user");
    } catch (err) {
      console.log(err);
    }
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onError={(err) => console.log(err)}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ user, onAuth, onLogout }}>
        {user ? <TabNavigator /> : <AuthNavigator />}
        <StatusBar hidden={true} />
      </AuthContext.Provider>
    </NavigationContainer>
  );
}


