import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as Yup from "yup";

import auth from "../api/auth";
import AuthContext from "../context/AuthContext";
import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import { colors } from "../config/colors";
const { width, height } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  passwordConfirm: Yup.string()
    // .oneOf([Yup.ref("password"), null], "Passwords must match")
    // .required("Password confirm is required"),
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirm is required"),
});

const slideIn = {
  0: {
    transform: [{ translateY: height }],
  },
  1: {
    transform: [{ translateY: 0 }],
  },
};

export default function LoginScreen() {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const { onAuth } = useContext(AuthContext);

  const handleRegister = async ({ name, email, password, passwordConfirm }) => {
    setLoaderVisible(true);
    const res = await auth.signup(name, email, password, passwordConfirm);
    if (res.status === "success") {
      onAuth({ ...res.user, token: res.token });
    } else {
      console.log(res.status);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        style={styles.background}
      >
        <Animatable.View
          style={styles.content}
          useNativeDriver={true}
          animation={slideIn}
          duration={1000}
          delay={300}
        >
          <AppText style={styles.heading}>Create Your Account</AppText>
          <View style={styles.inputContainer}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                passwordConfirm: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleRegister(values)}
            >
              {({ errors, touched, handleChange, handleSubmit, values }) => (
                <>
                  {/* <AppInput
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
                  /> */}
                  <AppInput
                    placeholder="Name"
                    icon="account"
                    keyboardType="default"
                    onChange={handleChange("name")}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <AppText style={styles.error}>{errors.name}</AppText>
                  )}
                  <AppInput
                    placeholder="Email"
                    icon="email"
                    keyboardType="email-address"
                    onChange={handleChange("email")}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <AppText style={styles.error}>{errors.email}</AppText>
                  )}
                  <AppInput
                    placeholder="Password"
                    icon="lock"
                    secureTextEntry
                    onChange={handleChange("password")}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <AppText style={styles.error}>{errors.password}</AppText>
                  )}
                  <AppInput
                    placeholder="Confirm Password"
                    icon="lock"
                    secureTextEntry
                    onChange={handleChange("passwordConfirm")}
                    value={values.passwordConfirm}
                  />
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <AppText style={styles.error}>
                      {errors.passwordConfirm}
                    </AppText>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    {loaderVisible ? (
                      <ActivityIndicator
                        color={colors.white}
                        animating={loaderVisible}
                        size="small"
                      />
                    ) : (
                      <AppText style={styles.btnText}>Create Account</AppText>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
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

  content: {
    width,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
    marginTop: 20,
    backgroundColor: colors.secondary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    //elevation: 1.5,
  },
  btnText: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.9,
  },
  inputContainer: {
    width: width * 0.8,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  error: {
    marginLeft: 10,
  },
});
