import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { colors } from "../config/colors";
import { SharedElement } from "react-navigation-shared-element";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import AppText from "../components/AppText";

const IMAGE_URL = "http://192.168.1.2:3000/public/img";
const { width, height } = Dimensions.get("window");

const slideRight = {
  0: {
    transform: [{ translateX: -width }],
    opacity: 0,
  },
  1: {
    transform: [{ translateX: 0 }],
    opacity: 1,
  },
};

const fadeIn = {
  0: {
    transform: [{ scale: 0 }],
    opacity: 0,
  },
  1: {
    transform: [{ scale: 1 }],
    opacity: 1,
  },
};

export default function ProductDetailsScreen({ route }) {
  const { data } = route.params;
  let arr1 = [];
  for (let i = 1; i < data.images.length; i++) {
    arr1.push(data.images[i]);
  }

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.images}>
        <Animated.ScrollView
          horizontal
          decelerationRate="fast"
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        >
          <SharedElement
            key="0"
            id={`item.${data._id}.image`}
            style={{ width, height: height * 0.45 }}
          >
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              source={{ uri: `${IMAGE_URL}/products/${data.images[0]}` }}
            />
          </SharedElement>
          {arr1.map((image, index) => {
            return (
              <Image
                key={String(index)}
                style={styles.productImage}
                source={{ uri: `${IMAGE_URL}/products/${image}` }}
              />
            );
          })}
        </Animated.ScrollView>
        <View style={styles.dots}>
          {data.images.map((_, i) => {
            const scale = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.6, 1, 0.6],
            });
            const opacity = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.6, 0.8, 0.6],
            });
            return (
              <Animated.View
                style={[styles.dot, { opacity, transform: [{ scale }] }]}
                key={i}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.container}>
        <Animatable.View
          animation={slideRight}
          useNativeDriver={true}
          duration={800}
          delay={600}
          style={{
            width,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <AppText style={styles.productName}>{data.name}</AppText>
        </Animatable.View>
        <View style={styles.productInfo}>
          <View style={styles.productPrimitive}>
            <Animatable.View
              animation={fadeIn}
              delay={900}
              duration={400}
              useNativeDriver={true}
              style={styles.productSeller}
            >
              <Image
                style={{ width: 80, height: 80, borderRadius: 40 }}
                source={{ uri: `${IMAGE_URL}/users/${data.seller.photo}` }}
              />
              <AppText style={styles.productSellerName}>
                {data.seller.name}
              </AppText>
              <TouchableOpacity>
                <AppText
                  style={{
                    marginTop: 10,
                    color: colors.primary,
                    fontSize: 14,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: "white",
                    borderRadius: 20,
                  }}
                >
                  Contact Seller
                </AppText>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              animation={fadeIn}
              useNativeDriver={true}
              delay={1000}
              duration={400}
              style={styles.productPriceContainer}
            >
              <AppText
                style={{
                  marginBottom: 10,
                  color: "#000",
                  opacity: 0.8,
                  fontSize: 20,
                }}
              >
                Price
              </AppText>
              <FontAwesome5
                name="money-bill-wave"
                size={40}
                color={colors.primary}
              />
              <AppText
                style={{ fontSize: 20, color: colors.primary, marginTop: 10 }}
              >
                {data.price}$
              </AppText>
            </Animatable.View>
          </View>
        </View>
        <View style={styles.productDetails}>
          <AppText style={{ color: colors.primary, fontSize: 22 }}>
            Product Description
          </AppText>
          <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
            <AppText
              style={{
                fontSize: 18,
                lineHeight: 22,
                textAlign: "center",
                opacity: 0.75,
              }}
            >
              {data.description}
            </AppText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  images: {
    width,
    height: height * 0.45,
    position: "relative",
  },
  productImage: {
    width,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginHorizontal: 20,
  },
  dots: {
    position: "absolute",
    width,
    bottom: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  productName: {
    fontSize: 28,
    color: colors.primary,
  },
  productInfo: {
    width,
    marginTop: 10,
    //backgroundColor: "#000",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  productPrimitive: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  productSeller: {
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-around",
    flex: 1 / 2,
  },
  productSellerName: {
    color: colors.white,
    fontSize: 14,
    marginTop: 10,
  },
  productPriceContainer: {
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-around",
    flex: 1 / 3,
    borderWidth: 3,
    borderColor: "#FDAFB3",
  },
  productDetails: {
    backgroundColor: colors.white,
    width,
    marginBottom: 20,
    alignItems: "center",
    padding: 20,
    borderRadius: 30,
  },
});
