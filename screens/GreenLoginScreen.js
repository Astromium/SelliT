import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as Yup from "yup";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import GreenLogin from "../svg/GreenLogin";
import { colors } from "../config/colors";
const { width, height } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

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

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        style={styles.background}
      >
        <Animatable.View
          animation={fadeIn}
          useNativeDriver={true}
          duration={800}
          delay={300}
          style={styles.image}
        >
          <GreenLogin width="100%" height="100%" />
        </Animatable.View>
        <Animatable.View
          style={styles.content}
          useNativeDriver={true}
          animation={slideIn}
          duration={1000}
          delay={300}
        >
          <AppText style={styles.heading}>Login To your Account</AppText>
          <View style={styles.inputContainer}>
            {/* <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleLogin(values.email, values.password)}
            >
              {({ errors, touched, handleChange, handleSubmit, values }) => (
                <>
                  <AppInput
                    placeholder="Email"
                    icon="email"
                    keyboardType="email-address"
                    onChange={handleChange("email")}
                    value={values.email}
                  />
                  <AppInput
                    placeholder="Password"
                    icon="lock"
                    secureTextEntry
                    onChange={handleChange("password")}
                    value={values.password}
                  />

                  <AppButton
                    onPress={handleSubmit}
                    style={{ marginTop: 20, marginBottom: 20 }}
                    color={colors.primary}
                    width="100%"
                    title="Login"
                    textColor={colors.white}
                    size={18}
                  />
                </>
              )}
            </Formik> */}
            <AppInput
              placeholder="Email"
              icon="lock"
              keyboardType="email-address"
            />
            <AppInput placeholder="Password" icon="email" secureTextEntry />
          </View>
          <TouchableOpacity style={styles.button}>
            <AppText style={styles.btnText}>Login</AppText>
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
    fontSize: 26,
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
    backgroundColor: "#43B679",
    borderRadius: 100,
    //elevation: 1.5,
  },
  btnText: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.9,
  },
  inputContainer: {
    width: width * 0.8,
    paddingHorizontal: 20,
  },
});
