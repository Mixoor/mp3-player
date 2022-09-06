import React, { Component } from "react";
import { Block, Text } from "../components";
import {
  BackHandler,
  Dimensions,
  PermissionsAndroid,
  Animated,
  Easing
} from "react-native";
import { connect } from "react-redux";
import {
  loadingAlbum,
  loadingArtist,
  loadingMusic,
  loadingPlaylist
} from "../redux/action/mediaAction";

import { getState } from "../redux/action/playlistAction";

import MediaPlayer from "../nativeModule/MediaPlayer";

const { width, height } = Dimensions.get("window");
class Splash extends Component {
  rotate = new Animated.Value(0);
  state = {
    loading: true
  };

  async componentDidMount() {
    Animated.loop(
      Animated.timing(this.rotate, {
        toValue: 1,
        easing: Easing.in,
        useNativeDriver: true
      })
    ).start();
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {}
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await this.props.getMusic();
        await this.props.getAlbum();
        await MediaPlayer.initService().then(this.props.getState());
        await this.props.getArtist();
        await this.props.getPlaylist();
        await this.setState({ loading: false });
      } else BackHandler.exitApp();
    } catch (err) {
      BackHandler.exitApp();
    }
  }

  render() {
    const size = (this.props.media.progress * width) / 100 + 10;
    let w = new Animated.Value(10);

    Animated.spring(w, {
      toValue: size,
      easing: Easing.bounce
    }).start(() => {
      if (!this.state.loading)
        setTimeout(() => {
          this.props.navigation.navigate("Main");
        }, 1500);
    });

    const r = this.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <Block flex={1} center middle>
        <Animated.Image
          style={{
            width: width > height ? height / 2 : width / 2,
            height: width > height ? height / 2 : width / 2,
            transform: [{ rotate: r }]
          }}
          source={require("../assets/preview.jpg")}
        />
        <Text h2 gray style={{ letterSpacing: 2, paddingTop: 10 }}>
          Loading...
        </Text>

        <Block
          animated
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            width: w,
            backgroundColor: "#434343"
          }}
        />
      </Block>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMusic: () => dispatch(loadingMusic()),
    getAlbum: () => dispatch(loadingAlbum()),
    getArtist: () => dispatch(loadingArtist()),
    getPlaylist: () => dispatch(loadingPlaylist()),
    getState: () => dispatch(getState())
  };
};

const mapStateTopros = state => {
  return {
    media: state.media
  };
};
export default connect(
  mapStateTopros,
  mapDispatchToProps
)(Splash);
