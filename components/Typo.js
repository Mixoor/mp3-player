import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

import { theme } from "../constants";

export default class Typo extends Component {
  render() {
    const {
      //size
      h1,
      h2,
      h3,
      title,
      caption,
      body,
      small,
      size,
      transform,
      //styling
      regular,
      bold,
      semibold,
      medium,
      light,
      center,
      right,
      spacing,
      height,
      weight,
      //colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      white,
      black,
      gray,
      gray2,
      gray3,
      style,
      children,
      ...props
    } = this.props;

    const textStyle = [
      styles.text,
      //size
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      transform && { textTransform: transform },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      //color predefini
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      gray3 && styles.gray3,
      style
    ];

    return (
      <Text style={textStyle} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  //default style
  text: {
    fontFamily: "Roboto",
    fontSize: theme.sizes.font,
    color: theme.colors.black
  },
  // variations
  regular: {
    fontWeight: "normal",
    fontFamily: "Roboto-Regular"
  },
  medium: {
    fontWeight: "500",
    fontFamily: "Roboto-Meduim"
  },
  bold: {
    fontWeight: "bold",
    fontFamily: "Roboto-Bold"
  },
  semibold: {
    fontWeight: "500",
    fontFamily: "Roboto-SemiBold"
  },
  light: {
    fontWeight: "200",
    fontFamily: "Roboto-Light"
  },
  //position
  center: {
    textAlign: "center"
  },

  right: {
    textAlign: "right"
  },
  //colors
  accent: {
    color: theme.colors.accent
  },
  primary: {
    color: theme.colors.primary
  },
  secondary: {
    color: theme.colors.secondary
  },
  tertiary: {
    color: theme.colors.tertiary
  },
  white: {
    color: theme.colors.white
  },
  gray: {
    color: theme.colors.gary
  },
  gray2: {
    color: theme.colors.gray2
  },
  gray3: {
    color: theme.colors.gray3
  },
  //fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  title: theme.fonts.title,
  body: theme.fonts.body,
  caption: theme.fonts.caption,
  small: theme.fonts.small
});
