import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../components';
import {COLORS, dummyData, FONTS, icons, images, SIZES} from '../constants';
import {ScrollView} from 'react-native-gesture-handler';
import {HomeProductType, HomeScreenProp} from '../types';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [data, setData] = useState(dummyData.tabList);
  const [selectedTab, setSelectedTab] = useState(data[0].id);
  const [selectedCategory, setSelectedCategory] = useState(data[0].productList);
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <ScrollView
      style={{flex: 1, minHeight: SIZES.height, backgroundColor: COLORS.white}}>
      <View style={{backgroundColor: COLORS.white, flex: 1}}>
        {/* Header */}
        <Header />
        {/* Heading */}
        <Heading />

        {/* Tabs */}
        <View style={{marginTop: SIZES.padding}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            data={data}
            renderItem={props => (
              <TabItem
                {...props}
                selectedTab={selectedTab}
                onPress={(id: number) => {
                  setSelectedTab(id);
                  setSelectedCategory(
                    data.find(item => item.id === id)!.productList,
                  );
                }}
              />
            )}
          />
        </View>

        {/* ScrollableCards */}
        <View style={{marginTop: SIZES.padding}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.productId.toString()}
            data={selectedCategory}
            renderItem={props => (
              <ScrollableCardsItem
                {...props}
                selectedTab={selectedTab}
                onPress={(item: HomeProductType) => {
                  navigation.navigate('ItemDetail', {item});
                }}
                lastItem={props.index === selectedCategory.length - 1}
              />
            )}
          />
        </View>

        <OfferSection />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});

function OfferSection() {
  return (
    <View
      style={{
        marginTop: SIZES.padding * 1.5,
        marginBottom: SIZES.padding,
        marginHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
        height: 110,
        borderRadius: 20,
        flexDirection: 'row',
        padding: SIZES.radius,
        ...styles.shadow,
      }}>
      <View
        style={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.lightGray2,
          borderRadius: 20,
        }}>
        <Image
          source={images.sofa}
          resizeMode="contain"
          style={{
            width: '60%',
            height: '60%',
          }}
        />
      </View>

      {/* Wordings section */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.h2}}>Special Offer</Text>
        <Text style={{...FONTS.body3}}>Adding to your cart</Text>
      </View>

      {/* Button */}
      <View
        style={{
          marginRight: SIZES.radius,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
            width: 40,
            borderRadius: 10,
          }}
          onPress={() => {
            console.log('Promo on clicked');
          }}>
          <Image
            source={icons.chevron}
            resizeMode="contain"
            style={{
              height: '50%',
              width: '50%',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
interface IScrollableCardsItem {
  item: HomeProductType;
  index: number;
  selectedTab: number;
  onPress: (item: HomeProductType) => void;
  lastItem: boolean;
}

function ScrollableCardsItem({
  item,
  index,
  lastItem,
  onPress,
}: IScrollableCardsItem) {
  return (
    <TouchableOpacity
      style={{
        marginLeft: SIZES.padding,
        marginRight: lastItem ? SIZES.padding : undefined,
      }}
      onPress={() => onPress(item)}>
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        style={{
          height: 300,
          width: SIZES.width / 2,
          paddingHorizontal: SIZES.padding,
          paddingTop: SIZES.padding,
          justifyContent: 'space-between',
        }}
        imageStyle={{borderRadius: SIZES.radius * 2}}>
        <View>
          <Text style={{color: COLORS.lightGray2, ...FONTS.h3}}>Furniture</Text>
          <Text
            style={{marginTop: SIZES.base, color: COLORS.white, ...FONTS.h2}}>
            {item.productName}
          </Text>
        </View>

        <View
          style={{
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: COLORS.transparentLightGray,
            marginBottom: SIZES.font,
            maxWidth: item.price >= 10000 ? 150 : 120,
          }}>
          <Text style={{...FONTS.h2}}>$ {item.price.toFixed(2)}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

interface ITabItem {
  item: typeof dummyData.tabList[0];
  index: number;
  selectedTab: number;
  onPress: (id: number) => void;
}
function TabItem({item, selectedTab, onPress}: ITabItem) {
  return (
    <TouchableOpacity
      style={{marginLeft: SIZES.padding}}
      onPress={() => onPress(item.id)}>
      <Text style={{color: COLORS.secondary, ...FONTS.body2}}>{item.name}</Text>
      {selectedTab === item.id && (
        <View style={{alignItems: 'center', marginTop: SIZES.base}}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLORS.blue,
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

function Heading() {
  return (
    <View
      style={{
        marginTop: SIZES.font,
        marginLeft: SIZES.padding,
        marginRight: SIZES.padding * 1.2,
      }}>
      <Text
        style={{
          ...FONTS.h1,
          fontSize: 42,
          fontWeight: '400',
          color: COLORS.black,
          marginTop: SIZES.base,
          lineHeight: undefined,
        }}>
        Collection of chairs
      </Text>
    </View>
  );
}
