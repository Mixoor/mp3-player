import React, { Component } from "react";
import {
  Dimensions,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Block, Text } from "../components";
import { theme } from "../constants";
import Slider from "@react-native-community/slider";
import { milltotime, millTosec, secTomill } from "../Util/util";
import MediaPlayer from "../nativeModule/MediaPlayer";
import { connect } from "react-redux";
import {
  togglePlay,
  seekTo,
  getState,
  next,
  prev,
  toggleRepeat,
  toggleShuffle
} from "../redux/action/playlistAction";
import { throwStatement } from "@babel/types";

const { width, height } = Dimensions.get("screen");
export class Player extends Component {
  state = {
    playing: true,
    liked: false,
    index: 0,
    playlist: [],
    progress: 0,
    repeat: true,
    shuffle: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Now Playing ",
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            clearInterval(this.progress);
            navigation.navigate("Equalizer");
          }}
        >
          <Image
            source={require("../assets/icons/back.png")}
            style={styles.icons}
          />
        </TouchableOpacity>
      )
    };
  };

  progress = null;

  toggleHeart() {
    this.setState(prev => {
      return { liked: !prev.liked };
    });
  }
  toggleShuffle() {
    this.props.toggleShuffle();
  }

  toggleRepeat() {
    this.props.toggleRepeat();
  }

  togglePlay() {
    if (!this.props.playlist.playing) {
      this.props.togglePlay();
      this.startInterval();
    } else {
      this.props.togglePlay();
      if (this.progress !== null) this.clearProgress();
    }
  }
  startInterval() {
    if (this.progress !== null) return;
    this.progress = setInterval(() => {
      MediaPlayer.getPosition().then(data => this.setState({ progress: data }));
    }, 100);
  }

  clearProgress() {
    if (this.progress === null) return;
    clearInterval(this.progress);
    this.progress = null;
  }
  componentDidMount() {
    if (this.props.playlist.playing) {
      this.startInterval();
    }
  }

  async componentWillUnmount() {
    if (this.progress != null) await this.clearProgress();
  }

  renderControl(playlist) {
    return (
      <Block margin={[theme.sizes.base, 0]} row space="between" center middle>
        <TouchableOpacity
          style={[
            styles.btn,
            this.props.playlist.shuffle ? styles.selected : null
          ]}
          onPress={() => this.toggleShuffle()}
        >
          <Image
            style={styles.control}
            source={require("../assets/icons/shuffle.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => {
            this.props.prev();
          }}
        >
          <Image
            style={styles.control}
            source={require("../assets/icons/skiptostart.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.togglePlay(playlist)}
          style={[styles.btn, styles.play]}
        >
          <Animated.Image
            style={[styles.control]}
            source={
              this.props.playlist.playing
                ? require("../assets/icons/pause.png")
                : require("../assets/icons/play.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => {
            this.props.next();
          }}
        >
          <Image
            style={styles.control}
            source={require("../assets/icons/skiptoend.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.toggleRepeat()}
          style={[
            styles.btn,
            this.props.playlist.repeat ? styles.selected : null
          ]}
        >
          <Image
            style={[styles.control]}
            source={require("../assets/icons/repeat.png")}
          />
        </TouchableOpacity>
      </Block>
    );
  }

  render() {
    let playlist = this.props.playlist.playlist;
    return (
      <Block>
        <ScrollView
          contentContainerStyle={{ paddingTop: theme.sizes.base * 2 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled
        >
          <Block
            padding={theme.sizes.base}
            column
            style={{ justifyContent: "space-between" }}
          >
            <Block flex={2} column center bottom>
              <Image
                style={styles.image}
                source={
                  playlist[this.props.playlist.index].AlbumArt
                    ? {
                        isStatic: true,
                        uri:
                          "file://" +
                          playlist[this.props.playlist.index].AlbumArt
                      }
                    : require("../assets/preview.jpg")
                }
                resizeMode="cover"
              />
              <Text h2 bold center>
                {playlist[this.props.playlist.index].Title}
              </Text>
              <Text caption center>
                {playlist[this.props.playlist.index].Artist}
                {playlist[this.props.playlist.index].Album}
              </Text>
            </Block>

            <Block flex={0.5} padding={[theme.sizes.base * 3, 0, 0, 0]}>
              <Block flex={false}>
                <Slider
                  trackStyle={styles.track}
                  onValueChange={data => {
                    this.props.seekTo(secTomill(data));
                  }}
                  style={{ height: 40 }}
                  height={20}
                  minimumTrackTintColor={theme.colors.black}
                  maximumTrackTintColor={theme.colors.gary}
                  minimumValue={0}
                  maximumValue={parseFloat(
                    millTosec(playlist[this.props.playlist.index].Duration)
                  )}
                  thumbStyle={styles.thumb}
                  value={parseFloat(millTosec(this.state.progress))}
                />
              </Block>
              <Block row space="between">
                <Text caption gray bold>
                  {milltotime(this.state.progress)}
                </Text>
                <Text caption gray bold right>
                  {milltotime(playlist[this.props.playlist.index].Duration)}
                </Text>
              </Block>
            </Block>
            <Block space="evenly">
              {this.renderControl(playlist)}

              <Block middle center>
                <TouchableOpacity onPress={() => this.toggleHeart()}>
                  <Image
                    style={styles.control}
                    source={
                      this.state.liked
                        ? require("../assets/icons/heartfilled.png")
                        : require("../assets/icons/heartnotdfilled.png")
                    }
                  />
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
    width: width > height ? height / 2 : width / 2,
    height: width > height ? height / 2 : width / 2
  },
  thumb: {
    width: 15,
    height: 15,
    borderColor: theme.colors.black,
    backgroundColor: theme.colors.secondary,
    borderWidth: 4,
    borderRadius: 15
  },
  icons: {
    width: 25,
    height: 25
  },
  control: {
    width: 35,
    height: 35,
    borderRadius: 35
  },
  play: {
    borderColor: "black",
    borderRadius: 50,
    borderWidth: 3,
    padding: 20
  },
  btn: {
    borderRadius: 55,
    padding: 8
  },
  selected: {
    backgroundColor: theme.colors.gray2
  }
});

const mapStateToProps = state => {
  return { playlist: state.player };
};
const mapDispatchToProps = dispatch => {
  return {
    togglePlay: () => dispatch(togglePlay()),
    seekTo: time => dispatch(seekTo(time)),
    getState: () => dispatch(getState()),
    next: () => dispatch(next()),
    prev: () => dispatch(prev()),
    toggleRepeat: () => dispatch(toggleRepeat()),
    toggleShuffle: () => dispatch(toggleShuffle())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
