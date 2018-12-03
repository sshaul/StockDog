import { StyleSheet, PixelRatio, Dimensions, Platform } from 'react-native';
import { colors } from '../colors';

const { height, width } = Dimensions.get("window");
const isX = Platform.OS === "ios" && (height > 800 || width > 800) ? true : false

export default tabStyle = StyleSheet.create({
   // ----------------- Containers ------------- //
   tabBar: {
      borderTopColor: colors.grey,
      borderTopWidth: 1 / PixelRatio.get(),
      height:isX ? 70 : 50
   },
   tabStyle: {
      paddingBottom:isX ? 20: 0,
   },
   // ----------------- Text ------------- //
   tabLabel: {
      color: colors.white,
      fontSize: 12,
      fontFamily: 'assistant'
   },
});