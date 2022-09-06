import React from "react";
import { Text } from "react-native";
import { PlayList, Player, Gallery, Equalizer, Splash } from "../screens";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { theme } from "../constants";

const screens = createStackNavigator(
  {
    Player,
    PlayList,
    Gallery,
    Equalizer
  },
  {
    initialRouteName: "Equalizer",
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: "white",
        textAlign: "center",
        elevation: 0,
        borderBottomColor: "transparent"
      },
      headerBackTitle: "",
      headerLeft: <Text>Left</Text>,
      headerRight: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        marginRight: theme.sizes.base,
        paddingLeft: theme.sizes.base
      },
      headerTitleStyle: {
        color: theme.colors.black,
        fontWeight: "400",
        textAlign: "center",
        alignItems: "center"
      },
      headerTitleAllowFontScaling: true
    }
  }
);

const withSplash = createSwitchNavigator({
  Splash: Splash,
  Main: screens
});

export default createAppContainer(withSplash);
