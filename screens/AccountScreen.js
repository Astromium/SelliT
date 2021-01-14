import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import mime from "mime";
import { colors } from "../config/colors";
import AppText from "../components/AppText";

const { width, height } = Dimensions.get("window");
const IMG_BASE_URL = "http://192.168.1.2:3000/public/img/users";

export default function AccountScreen() {
  const { user, onLogout } = useContext(AuthContext);
  const [userImage, setUserImage] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{ width: 100, height: 100, padding: 20, position: "relative" }}
        >
          <Image
            style={[
              { borderRadius: 50, borderWidth: 2, borderColor: colors.white },
              StyleSheet.absoluteFillObject,
            ]}
            resizeMode="cover"
            source={{ uri: `${IMG_BASE_URL}/${user.photo}` }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              zIndex: 100,
              width: 35,
              height: 35,
              backgroundColor: colors.white,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
              bottom: 0,
              right: 0,
            }}
          >
            <MaterialCommunityIcons
              name="camera"
              size={22}
              color="rgba(0,0,0,0.6)"
            />
          </TouchableOpacity>
        </View>
        <AppText style={styles.name}>{user.name}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    height: height * 0.3,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    color: colors.primary,
    marginVertical: 10,
  },
});
