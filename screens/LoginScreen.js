import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as Yup from "yup";

import AppText from "../components/AppText";
import AppInput from '../components/AppInput'
import Login from "../svg/Login";
import { colors } from "../config/colors";
import AuthContext from '../context/AuthContext'
import auth from '../api/auth'

const { width, height } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
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

  const [loaderVisible, setLoaderVisible] = useState(false)
  const { onAuth } = useContext(AuthContext)

  const handleLogin = async ({email, password}) => {
    setLoaderVisible(true)
    const res = await auth.login(email, password)
    if(res.status === 'success') {
      setLoaderVisible(false)
      await onAuth(res.user)
    } else {
      console.log(res.status);
    }
  }
  

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
          <Login width="100%" height="100%" />
        </Animatable.View>
        <Animatable.View
          style={styles.content}
          useNativeDriver={true}
          animation={fadeIn}
          duration={1000}
          delay={300}
        >
          <AppText style={styles.heading}>Login To your Account</AppText>
          <View style={styles.inputContainer}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleLogin(values)}
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
                  {errors.email && touched.email && (
                    <AppText style={styles.error}> {errors.email} </AppText>
                  )}
                  <AppInput
                    placeholder="Password"
                    icon="lock"
                    secureTextEntry
                    onChange={handleChange("password")}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <AppText style={styles.error}> {errors.password} </AppText>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    {loaderVisible ? (
                      <ActivityIndicator
                        animating={loaderVisible}
                        color={colors.white}
                        size="small"
                      />
                    ) : (
                      <AppText style={styles.btnText}>Login</AppText>
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
    backgroundColor: colors.secondary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.9,
  },
  inputContainer: {
    width: width * 0.8,
    paddingHorizontal: 20
  },
  error: {
    marginLeft: 10,
    color: '#000'
  }
});
