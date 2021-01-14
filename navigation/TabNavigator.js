import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Foundation } from "@expo/vector-icons";

import HomeNavigator from "./HomeNavigator";
import { colors } from "../config/colors";
import { View } from "react-native";
import AppText from "../components/AppText";
import AddButton from "../components/AddButton";
import AddProductScreen from "../screens/AddProductScreen";
import AccountScreen from "../screens/AccountScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeBackgroundColor: colors.white,
        inactiveBackgroundColor: colors.white,
        activeTintColor: colors.primary,
        inactiveTintColor: "#ccc",
        tabStyle: { borderWidth: 0, padding: 5 },
        labelStyle: {
          fontFamily: "Livvic-Regular",
        },
      }}
    >
      <Tab.Screen
        component={HomeNavigator}
        name="Home"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons size={size} color={color} name="home" />
          ),
        }}
      />
      <Tab.Screen
        component={AddProductScreen}
        name="AddProduct"
        options={({ navigation }) => ({
          tabBarButton: () => (
            <AddButton onPress={() => navigation.navigate("AddProduct")} />
          ),
        })}
      />

      <Tab.Screen
        component={AccountScreen}
        name="Account"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons size={size} color={color} name="account" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
