import {
  ColorValue,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, icons, SIZES} from '../constants';

interface IProps {
  searchIcon?: boolean;
  iconsColor?: ColorValue;
}

const Header = ({searchIcon, iconsColor}: IProps) => {
  const getIcon = (icon: ImageSourcePropType) => (
    <TouchableOpacity>
      <Image
        source={icon}
        resizeMode="cover"
        style={{height: 30, width: 30, tintColor: iconsColor ?? COLORS.black}}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.padding,
      }}>
      {getIcon(icons.menu)}
      {getIcon(searchIcon ? icons.search : icons.cart)}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
