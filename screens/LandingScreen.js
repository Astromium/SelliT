import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable'

import AppText from "../components/AppText";
import Landing from "../svg/Landing";
import { colors } from "../config/colors";
const { width, height } = Dimensions.get("window");

const fadeIn = {
  0: {
    opacity: 0,
    transform: [{ translateX: width }],
  },
  1: {
    opacity: 1,
    transform: [{ translateX: 0 }],
  },
};

const slideIn = {
    0: {
      transform: [{ translateY: height }],
    },
    1: {
      transform: [{ translateY: 0 }],
    },
};

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.background}
      >
        <Animatable.View
          animation={fadeIn}
          useNativeDriver={true}
          duration={800}
          delay={300}
          style={styles.image}
        >
          <Landing width="100%" height="100%" />
        </Animatable.View>
        <Animatable.View
          style={styles.content}
          useNativeDriver={true}
          animation={slideIn}
          duration={1000}
          delay={300}
        >
          <AppText style={styles.heading}>Welcome To SelliT</AppText>
          <AppText style={styles.subHeading}>
            a simple & easy to use user-to-user online shopping app
          </AppText>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.button}
          >
            <AppText style={styles.btnText}>Create Your Account</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <AppText
              style={[
                styles.btnText,
                { color: colors.primary, fontWeight: "800", opacity: 1 },
              ]}
            >
              Already Have an Account ? Log in
            </AppText>
          </TouchableOpacity>
        </Animatable.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  background: {
    flex: 1,
    width,
    height,
  },
  image: {
    height: height * 0.5,
    width,
    padding: 20,
  },
  content: {
    height: height * 0.5,
    width,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  heading: {
    fontSize: 32,
    color: colors.white,
  },
  subHeading: {
    fontSize: 18,
    opacity: 0.8,
    color: colors.white,
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  btnText: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.9,
  },
});
