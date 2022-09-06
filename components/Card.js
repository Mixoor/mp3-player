import React, { Component } from 'react';
import {Block} from './';
import { theme } from '../constants';
import {StyleSheet} from 'react-native';

export default class componentName extends Component {

  render() {

    const {
        color,
        style,
        children,
        ...props
    } = this.props;

    const cardStyles=[
        styles.card,
        style
    ];


    return (
     <Block style={cardStyles} color={color || theme.colors.white} {...props}>
         {children}
     </Block>
    );
  }
}


const styles =StyleSheet.create({
    card:{
        borderRadius:theme.sizes.raduis,
        padding: theme.sizes.base+4,
        marginBottom: theme.sizes.base,
    }
});
