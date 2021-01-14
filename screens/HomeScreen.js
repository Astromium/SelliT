import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AppInput from "../components/AppInput";
import AppText from "../components/AppText";
import { colors } from "../config/colors";
import AuthContext from "../context/AuthContext";
import products from "../api/products";
import { LinearGradient } from "expo-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import CategoriesModel from "./CategoriesModel";

const { width, height } = Dimensions.get("window");

const IMAGE_URL = "http://192.168.1.2:3000/public/img";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(2);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [category, setCategory] = useState("Category");
  const { user, onLogout } = useContext(AuthContext);

  const handleLogout = async () => {
    await onLogout();
  };

  const loadData = async () => {
    setLoaderVisible(true);
    const res = await products.getProducts(`page=${1}`);
    if (res.status === "success") {
      setData(res.products);
      setLoaderVisible(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onEndReached = async () => {
    if (!endReached) {
      try {
        setFetchingData(true);
        const res = await products.getProducts(`page=${page}`);
        if (res.status === "success") {
          if (res.products.length > 0) {
            setData(data.concat(res.products));
            //console.log(res.products);
            setPage((page) => (page = page + 1));
            setFetchingData(false);
          } else {
            setFetchingData(false);
            setEndReached(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (loaderVisible) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={loaderVisible}
          color={colors.primary}
          size="large"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={[styles.headerText, { marginRight: 5 }]}>Hello</AppText>
        <AppText style={[styles.headerText, { color: colors.primary }]}>
          {user.name.toUpperCase()}
        </AppText>
      </View>
      {/* <View style={{ width, paddingHorizontal: 20 }}>
          <AppText style={styles.headerSubText}>
            Let's see what we've got for you
          </AppText>
        </View> */}
      <View style={styles.searchContainer}>
        <AppInput
          placeholder="Search"
          onChange={() => {}}
          inputContainerStyle={{
            flex: 1,
            borderRadius: 100,
            backgroundColor: "rgba(255,255,255,0.8)",
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}
          inputStyle={{ borderBottomWidth: 0 }}
          placeHolderTextColor="rgba(0,0,0,0.6)"
        />
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => setCategoryModal(true)}
          style={{
            backgroundColor: colors.primary,
            marginHorizontal: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText style={{ color: "#fff", fontSize: 18 }}>{category}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Feather name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.feed}>
        <AppText style={[styles.headerText, { fontSize: 24 }]}>
          Latest Products
        </AppText>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item._id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
          snapToInterval={height * 0.5 + 25}
          decelerationRate="fast"
          style={{ marginBottom: 10 }}
          onEndReached={onEndReached}
          ListFooterComponent={() => {
            return (
              <View style={styles.listFooter}>
                <ActivityIndicator
                  animating={fetchingData}
                  color={colors.primary}
                  size="large"
                />
              </View>
            );
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductDetails", { data: item })
                }
                style={{
                  height: height * 0.5,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  marginTop: 25,
                  width: width * 0.85,
                }}
              >
                <SharedElement
                  id={`item.${item._id}.image`}
                  style={{ width: width * 0.85, height: height / 2 }}
                >
                  <Image
                    source={{
                      uri: `${IMAGE_URL}/products/${item.images[0]}`,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />
                </SharedElement>
                <LinearGradient
                  colors={["transparent", "#000"]}
                  style={styles.cardContent}
                >
                  <AppText style={styles.itemName}>{item.name}</AppText>
                  <View style={styles.cardFooterContent}>
                    <View style={styles.itemSeller}>
                      <Image
                        source={{
                          uri: `${IMAGE_URL}/users/${item.seller.photo}`,
                        }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                        }}
                      />
                      <AppText style={styles.itemSellerName}>
                        {item.seller.name}
                      </AppText>
                    </View>
                    <View style={styles.itemPrice}>
                      <AppText style={{ color: colors.primary, fontSize: 18 }}>
                        {item.price} $
                      </AppText>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Modal animationType="slide" visible={categoryModal}>
        <CategoriesModel
          onBackPress={() => setCategoryModal(false)}
          onItemPress={(item) => {
            setCategory(item);
            setCategoryModal(false);
          }}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width,
    height,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    width,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  headerText: {
    fontSize: 32,
    color: "rgba(0,0,0,0.75)",
  },
  headerSubText: {
    fontSize: 18,
    color: "rgba(0,0,0,0.7)",
  },
  searchContainer: {
    marginTop: 15,
    width,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  feed: {
    width,
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  cardContent: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 20,
  },
  itemName: {
    color: colors.primary,
    fontSize: 22,
  },
  cardFooterContent: {
    width: width * 0.8,
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  itemSeller: {
    flex: 2 / 3,
    flexDirection: "row",
    alignItems: "center",
  },
  itemSellerName: {
    color: colors.white,
    opacity: 0.8,
    marginLeft: 10,
    fontSize: 16,
  },
  itemPrice: {
    flex: 1 / 3,
  },
  listFooter: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
