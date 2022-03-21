import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ItemDetailsScreenProp, RootStackParamList} from '../types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Header} from '../components';
import {COLORS, FONTS, icons, SIZES} from '../constants';

interface IProps {}

const ItemDetails = ({}: IProps) => {
  const navigation = useNavigation<ItemDetailsScreenProp>();
  const item =
    useRoute<RouteProp<RootStackParamList, 'ItemDetail'>>().params.item;

  return (
    <ImageBackground
      source={item.image}
      resizeMode="cover"
      style={{flex: 1, justifyContent: 'space-between'}}>
      <Header searchIcon={true} iconsColor={COLORS.white} />

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            minHeight: 100,
            minWidth: SIZES.width / 2,
            maxWidth: SIZES.width,
            backgroundColor: COLORS.transparentLightGray,
            borderRadius: 20,
            padding: SIZES.font,
            marginLeft: SIZES.padding * 2,
            marginTop: SIZES.padding * 4,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h3,
              marginBottom: SIZES.base,
            }}>
            Chair
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: COLORS.darkGray, ...FONTS.h3}}>
              {item.productName}
            </Text>
            <Text
              style={{
                color: COLORS.darkGreen,
                ...FONTS.h3,
                marginLeft: SIZES.padding,
              }}>
              $ {item.price.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={{paddingHorizontal: SIZES.padding}}>
        <Text style={{color: COLORS.lightGray2, ...FONTS.body2}}>
          Furniture
        </Text>
        <Text
          style={{marginTop: SIZES.radius, color: COLORS.white, ...FONTS.h1}}>
          {item.productName}
        </Text>

        <View
          style={{
            height: 80,
            backgroundColor: COLORS.white,
            borderRadius: 48,
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginVertical: SIZES.padding,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.dashboard}
              style={{
                tintColor: COLORS.gray,
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 10,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => console.log('Add on clicked')}>
            <Image
              source={icons.plus}
              style={{
                tintColor: COLORS.white,
                height: 20,
                width: 20,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Profile on clicked')}>
            <Image
              source={icons.user}
              style={{
                tintColor: COLORS.gray,
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({});
