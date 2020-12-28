import React from 'react'
import { ScrollView, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AppText from '../components/AppText';
import { colors } from '../config/colors';

const { width, height } = Dimensions.get('window')

const CATEGORIES = [
  "Appliances",
  "Arts, Crafts, & Sewing",
  "Beauty & Personal Care",
  "Books",
  "Phones & Accessories",
  "Clothing, Shoes and Jewelry",
  "Computers",
  "Electronics",
  "Home & Kitchen",
  "Musical Instruments",
  "Sports & Outdoors",
  "Toys & Games",
]; 

export default function CategoriesModel({onBackPress, onItemPress}) {
    return (
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress} style={{}}>
            <Ionicons name="ios-arrow-back" size={30} color={colors.primary} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Select a Category</AppText>
        </View>
        <View>
            {CATEGORIES.map((cat, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => onItemPress(cat)}
                    style={{
                      width,
                      marginVertical: 15,
                      padding: 5,
                      alignItems: "center",
                    }}
                    key={i}
                  >
                    <AppText style={{ fontSize: 18 }}>{cat}</AppText>
                  </TouchableOpacity>
                );
            })}
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  header: {
    width,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  headerTitle: {
      fontSize: 20,
      color: colors.primary,
      flex: 1,
      textAlign: 'center'
  }
});