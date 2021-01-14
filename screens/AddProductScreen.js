import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import mime from "mime";
import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import { colors } from "../config/colors";
import CategoriesModel from "./CategoriesModel";
import AuthContext from "../context/AuthContext";
import products from "../api/products";

const { width } = Dimensions.get("window");

export default function AddProductScreen() {
  const [category, setCategory] = useState("Select Category");
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const { user } = useContext(AuthContext);

  const handleNameChange = (text) => {
    setName(text);
  };
  const handlePriceChange = (text) => {
    setPrice(text);
  };
  const handleDescriptionChange = (text) => setDescription(text);

  useEffect(() => {
    (async () => {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage1(result);
    }
  };
  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage2(result);
    }
  };
  const pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage3(result);
    }
  };
  const pickImage4 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage4(result);
    }
  };

  const handleAddProduct = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category", category);

    // This is a pretty weird stuff
    // appareantly you cant directly append the image to the formData
    // you have to modify the uri and the type
    // freaking react-native stuff as always
    if (image1 !== null) {
      const newUri = "file:///" + image1.uri.split("file:/").join("");
      data.append("images", {
        uri: newUri,
        type: mime.getType(newUri),
        name: newUri.split("/").pop(),
      });
    }
    if (image2 !== null) {
      const newUri = "file:///" + image2.uri.split("file:/").join("");
      data.append("images", {
        uri: newUri,
        type: mime.getType(newUri),
        name: newUri.split("/").pop(),
      });
    }
    if (image3 !== null) {
      const newUri = "file:///" + image3.uri.split("file:/").join("");
      data.append("images", {
        uri: newUri,
        type: mime.getType(newUri),
        name: newUri.split("/").pop(),
      });
    }
    if (image4 !== null) {
      const newUri = "file:///" + image4.uri.split("file:/").join("");
      data.append("images", {
        uri: newUri,
        type: mime.getType(newUri),
        name: newUri.split("/").pop(),
      });
    }
    // if (image1 !== null) data.append("images", image1);
    // if (image2 !== null) data.append("images", image2);
    // if (image3 !== null) data.append("images", image3);
    // if (image4 !== null) data.append("images", image4);
    const res = await products.addProduct(user.token, data);
    if (res.status === "success") {
      console.log(res.status);
    } else {
      console.log(res.status);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <AppText style={styles.title}>Add a Product</AppText>
        <AppInput
          placeholder="Product Name"
          icon="border-color"
          onChange={handleNameChange}
          inputStyle={{
            color: "rgba(0,0,0,0.7)",
            borderBottomColor: colors.primary,
          }}
        />
        <AppInput
          placeholder="Price"
          icon="diamond-stone"
          inputContainerStyle={{ width: "60%" }}
          onChange={handlePriceChange}
          inputStyle={{
            color: "rgba(0,0,0,0.7)",
            borderBottomColor: colors.primary,
          }}
        />
        <View>
          <TouchableOpacity
            onPress={() => setCategoriesVisible(true)}
            style={styles.category}
          >
            <AppText style={styles.categoryText}>{category}</AppText>
          </TouchableOpacity>
        </View>
        <AppInput
          placeholder="Product Description"
          multiline={true}
          numberOfLines={4}
          onChange={handleDescriptionChange}
          inputStyle={{
            color: "rgba(0,0,0,0.7)",
            borderBottomColor: colors.primary,
            height: 120,
            textAlignVertical: "top",
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: 15,
            borderRadius: 5,
          }}
        />
        <AppText
          style={{
            fontSize: 18,
            color: colors.primary,
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          Add Product images
        </AppText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={
              image1 === null
                ? pickImage1
                : () => {
                    setImage1(null);
                  }
            }
            style={{
              height: 200,
              width: "48%",
              borderRadius: 5,
              backgroundColor: colors.white,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {image1 === null ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="camera"
                  size={38}
                  color={colors.primary}
                />
                <AppText>Tap To Add an image</AppText>
              </View>
            ) : (
              <Image
                style={[StyleSheet.absoluteFillObject]}
                resizeMode="cover"
                source={{ uri: image1.uri }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={
              image2 === null
                ? pickImage2
                : () => {
                    setImage2(null);
                  }
            }
            style={{
              height: 200,
              width: "48%",
              borderRadius: 5,
              backgroundColor: colors.white,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {image2 === null ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="camera"
                  size={38}
                  color={colors.primary}
                />
                <AppText>Tap To Add an image</AppText>
              </View>
            ) : (
              <Image
                style={[StyleSheet.absoluteFillObject]}
                resizeMode="cover"
                source={{ uri: image2.uri }}
              />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={
              image3 === null
                ? pickImage3
                : () => {
                    setImage3(null);
                  }
            }
            style={{
              height: 200,
              width: "48%",
              borderRadius: 5,
              backgroundColor: colors.white,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {image3 === null ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="camera"
                  size={38}
                  color={colors.primary}
                />
                <AppText>Tap To Add an image</AppText>
              </View>
            ) : (
              <Image
                style={[StyleSheet.absoluteFillObject]}
                resizeMode="cover"
                source={{ uri: image3.uri }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={
              image4 === null
                ? pickImage4
                : () => {
                    setImage4(null);
                  }
            }
            style={{
              height: 200,
              width: "48%",
              borderRadius: 5,
              backgroundColor: colors.white,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {image4 === null ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="camera"
                  size={38}
                  color={colors.primary}
                />
                <AppText>Tap To Add an image</AppText>
              </View>
            ) : (
              <Image
                style={[StyleSheet.absoluteFillObject]}
                resizeMode="cover"
                source={{ uri: image4.uri }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={handleAddProduct}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
              backgroundColor: colors.primary,
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppText style={{ fontSize: 18, color: colors.white }}>
              Add Product
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={categoriesVisible}>
        <CategoriesModel
          onBackPress={() => setCategoriesVisible(false)}
          onItemPress={(item) => {
            setCategory(item);
            setCategoriesVisible(false);
          }}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
  },
  inputContainer: {
    width: "90%",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 20,
    color: colors.primary,
  },
  category: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: colors.primary,
    marginVertical: 20,
    marginLeft: 10,
  },
  categoryText: {
    fontSize: 17,
    color: colors.white,
  },
});
