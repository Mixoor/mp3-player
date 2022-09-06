import React, { Component } from "react";
import { StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Block, Text } from "../components";
import { theme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const { heigth, width } = Dimensions.get("window");
class Gallery extends Component {
  static navigationOptions = {
    headerTitle: "Gallery"
  };

  renderAlbums() {
    return (
      <Block padding={[0, theme.sizes.base]}>
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => this.props.navigation.navigate("PlayList")}
        >
          <Image
            source={require("../assets/preview.jpg")}
            style={styles.image}
          />
        </TouchableOpacity>
        <Block flex={1} center>
          <Text title>Picture</Text>
          <Text gray caption>
            Picture
          </Text>
        </Block>
      </Block>
    );
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex={2.1} padding={[theme.sizes.base, 0]}>
          <Block
            flex={0.1}
            row
            space="between"
            padding={[theme.sizes.base / 3, theme.sizes.base]}
          >
            <Text h2 Bold>
              Popular
            </Text>
            <Text style={styles.small} gray caption>
              See More
            </Text>
          </Block>

          <Block flex={2} row padding={[0, theme.sizes.base]}>
            {this.renderAlbums()}
            {this.renderAlbums()}
          </Block>
        </Block>

        <Block flex={2.1} padding={[theme.sizes.base, 0]}>
          <Block
            flex={0.1}
            row
            space="between"
            padding={[theme.sizes.base / 3, theme.sizes.base]}
          >
            <Text h2 Bold>
              Populars
            </Text>
            <Text style={styles.small} gray caption>
              See More
            </Text>
          </Block>

          <Block flex={2} row padding={[0, theme.sizes.base]}>
            {this.renderAlbums()}
            {this.renderAlbums()}
          </Block>
        </Block>

        <Block flex={2.1} padding={[theme.sizes.base, 0]}>
          <Block
            flex={0.1}
            row
            space="between"
            padding={[theme.sizes.base / 3, theme.sizes.base]}
          >
            <Text h2 Bold>
              Popular
            </Text>
            <Text style={styles.small} gray caption>
              See More
            </Text>
          </Block>

          <Block flex={2} row padding={[0, theme.sizes.base]}>
            {this.renderAlbums()}
            {this.renderAlbums()}
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  small: {
    paddingTop: theme.sizes.base / 2
  },
  image: {
    width: width / 2 - theme.sizes.base * 3,
    height: width / 2 - theme.sizes.base * 3,
    borderRadius: theme.sizes.raduis
  },
  shadow: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowColor: "#000",
    shadowRadius: 8
  }
});

export default Gallery;
