import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import HomeScreen from "../screens/HomeScreen";
import ProductDetailsScreen from '../screens/ProductDetailsScreen'
// import Speciality from "../screens/Speciality";

const Stack = createSharedElementStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={(navigation) => ({
          headerBackTitleVisible: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
          gestureEnabled: true,
          transitionSpec: {
            open: { animation: "timing", config: { delay: 300 } },
            close: { animation: "timing", config: { delay: 300 } },
          },
        })}
        sharedElementsConfig={(route) => {
          const { data } = route.params;
          return [
            {
              id: `item.${data._id}.productName`,
            },
            {
              id: `item.${data._id}.image`,
            },
            {
              id: `item.${data._id}.sellerImage`,
            },
            {
              id: `item.${data._id}.sellerName`,
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
