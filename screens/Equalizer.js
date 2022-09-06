import React, { PureComponent } from "react";
import { Block, Text } from "../components";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  FlatList,
  Animated,
  Dimensions
} from "react-native";
import { theme } from "../constants";
import { connect } from "react-redux";
import MediaStore from "../nativeModule/MediaStore";
import MediaPlayer from "../nativeModule/MediaPlayer";

import { newPlaylist } from "../redux/action/playlistAction";
import { togglePlay } from "../redux/action/playlistAction";

import { millTosec } from "../Util/util";

const categories = ["Popular Songs", "Albums", "Artists", "Playlist"];
var { width, height } = Dimensions.get("window");
class Equalizer extends PureComponent {
  constructor(props) {
    super(props);
    this.scroll = React.createRef();
    this.flatScroll = React.createRef();
  }
  progress = null;

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Browse",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate("Equalizer")}>
          <Image
            source={require("../assets/icons/menu.png")}
            style={styles.icons}
          />
        </TouchableOpacity>
      )
    };
  };

  state = {
    categorie: 0,
    orientation: null,
    progress: 0
  };

  startInterval() {
    return null;
    if (this.progress === null) {
      this.progress = setInterval(() => {
        MediaPlayer.getPosition().then(data => {
          const w = width;
          this.setState({
            progress:
              (w * data) /
              this.props.playlist.playlist[this.props.playlist.index].Duration
          });
        });
      }, 100);
    }
  }

  renderCategories() {
    const bar = categories.map((item, i) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.scroll.current.scrollTo({
              x: i * theme.sizes.base * 2.5,
              y: 0,
              animated: true
            });
            this.setState({ categorie: i });
          }}
          key={`cat${i}`}
          style={{
            paddingHorizontal: theme.sizes.base,
            paddingVertical: 10,
            height: 50
          }}
        >
          {this.state.categorie === i ? (
            <Block column center>
              <Text title bold black>
                {item}
              </Text>
              <Block flex={false} style={styles.ball} />
            </Block>
          ) : (
            <Text title bold gray>
              {item}
            </Text>
          )}
        </TouchableOpacity>
      );
    });
    return bar;
  }

  renderAlbum(items) {
    let playItem = null;
    const { navigation } = this.props;
    if (items) {
      const { item } = items;
      playItem = (
        <TouchableNativeFeedback
          delayPressIn={350}
          onPress={() => {
            MediaStore.getMediaByAlbum(item.Id)
              .then(data => {
                this.props.newPlaylist(
                  {
                    ...data
                  },
                  navigation
                );
              })
              .catch(err => console.log(err));
            this.startInterval();
          }}
        >
          <Block
            padding={[theme.sizes.base, theme.sizes.base * 2]}
            flex={1}
            row
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 8
              }}
              source={
                item.AlbumArt
                  ? {
                      uri: "file://" + item.AlbumArt
                    }
                  : require("../assets/preview.jpg")
              }
            />
            <Block padding={[8, 10]}>
              <Text title bold>
                {item.Album}
              </Text>
              <Text small gray bold style={{ paddingTop: 1 }}>
                {item.Artist}
              </Text>
            </Block>
            <Text
              bold
              gray
              caption
              style={{
                textAlignVertical: "center"
              }}
            >
              {item.NumberOfSong}
            </Text>
          </Block>
        </TouchableNativeFeedback>
      );
    }
    return playItem;
  }

  renderPlay(items) {
    let playItem = null;
    const { navigation } = this.props;
    if (items) {
      const { item } = items;
      playItem = (
        <TouchableNativeFeedback
          onPress={() => {
            setTimeout(() => {
              // navigation.navigate("Player", {
              //   playlist: {
              //     playlist: [{ ...item }]
              //   }
              // });

              this.props.newPlaylist(
                {
                  playlist: [{ ...item }]
                },
                navigation
              );

              this.startInterval();
            }, 0);
          }}
        >
          <Block
            padding={[theme.sizes.base, theme.sizes.base * 2]}
            flex={1}
            row
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 8
              }}
              source={
                item.AlbumArt
                  ? {
                      uri: "file://" + item.AlbumArt
                    }
                  : require("../assets/preview.jpg")
              }
            />
            <Block padding={[8, 10]}>
              <Text title bold>
                {item.Title}
              </Text>
              <Text small gray bold style={{ paddingTop: 1 }}>
                {item.Artist}
              </Text>
            </Block>
            <Text
              bold
              gray
              caption
              style={{
                textAlignVertical: "center"
              }}
            >
              {millTosec(item.Duration)
                .toString()
                .replace(".", ":")}
            </Text>
          </Block>
        </TouchableNativeFeedback>
      );
    }
    return playItem;
  }

  renderArtist(items) {
    let playItem = null;
    const { navigation } = this.props;
    if (items) {
      const { item } = items;
      playItem = (
        <TouchableNativeFeedback
          onPress={() => {
            MediaStore.getMediaByArtist(item.Id)
              .then(data => {
                this.props.newPlaylist(
                  {
                    ...data
                  },
                  navigation
                );
                this.startInterval();
              })
              .catch(err => console.log(err));
          }}
        >
          <Block
            padding={[theme.sizes.base, theme.sizes.base * 2]}
            flex={1}
            row
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 8
              }}
              source={
                item.AlbumArt
                  ? {
                      uri: "file://" + item.AlbumArt
                    }
                  : require("../assets/preview.jpg")
              }
            />
            <Block padding={[8, 10]}>
              <Text title bold>
                {item.Artist}
              </Text>
              <Text small gray bold style={{ paddingTop: 1 }}>
                {item.Artist}
              </Text>
            </Block>
            <Text
              bold
              gray
              caption
              style={{
                textAlignVertical: "center"
              }}
            >
              {item.Tracks}
            </Text>
          </Block>
        </TouchableNativeFeedback>
      );
    }
    return playItem;
  }

  renderControl() {
    const { navigation } = this.props;
    return (
      <TouchableNativeFeedback
        onPress={() => {
          clearInterval(this.progress);
          setTimeout(
            () => {
              navigation.navigate("Player");
            },

            0
          );
        }}
      >
        <Block
          style={{ position: "relative", height: 80 }}
          color="gray2"
          padding={[theme.sizes.base, theme.sizes.base * 2]}
          flex={1}
          row
          middle
          center
        >
          <Block
            style={{
              position: "absolute",
              width: this.state.progress,
              height: 4,
              top: 0,
              left: 0
            }}
            color="red"
          />
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 8
            }}
            source={
              this.props.playlist.playlist[this.props.playlist.index].AlbumArt
                ? {
                    isStatic: true,
                    uri:
                      "file://" +
                      this.props.playlist.playlist[this.props.playlist.index]
                        .AlbumArt
                  }
                : require("../assets/preview.jpg")
            }
          />
          <Block padding={[8, 10]}>
            <Text title bold>
              {this.props.playlist.playlist[this.props.playlist.index].Title}
            </Text>
            <Text small gray bold style={{ paddingTop: 1 }}>
              {this.props.playlist.playlist[this.props.playlist.index].Artist}
            </Text>
          </Block>

          <TouchableOpacity
            onPress={async () => {
              if (this.props.playlist.playing) {
                //
                this.startInterval();
              } else {
                clearInterval(this.progress);
                this.progress = null;
              }
              await this.props.togglePlay();
            }}
            style={[styles.btn, styles.play]}
          >
            <Animated.Image
              style={{ width: 35, height: 35 }}
              source={
                this.props.playlist.playing
                  ? require("../assets/icons/pause.png")
                  : require("../assets/icons/play.png")
              }
            />
          </TouchableOpacity>
        </Block>
      </TouchableNativeFeedback>
    );
  }

  renderStuff(item) {
    if (this.state.categorie === 0) {
      return this.renderPlay(item);
    } else if (this.state.categorie === 1) {
      return this.renderAlbum(item);
    } else {
      return this.renderArtist(item);
    }
  }

  setKey = (item, i) => {
    return "item" + i;
  };

  componentDidMount() {
    //  if (this.props.playlist.playing) this.startInterval();
  }

  componentWillUnmount() {
    if (this.progress != null) clearInterval(this.progress);
    this.progress = null;
  }

  render() {
    const { media } = this.props;
    let data;

    if (this.state.categorie === 0) {
      data = media.music;
    } else if (this.state.categorie === 1) {
      data = media.album;
    } else if (this.state.categorie === 2) {
      data = media.artist;
    } else {
      data = [];
    }
    const SVheight = width > height ? 0.2 : 0.1;
    return (
      <Block flex={1}>
        <Block flex={false} style={{ height: 50 }}>
          <ScrollView
            contentContainerStyle={{
              justifyContent: "space-between"
            }}
            ref={this.scroll}
            scrollEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            {this.renderCategories()}
          </ScrollView>
        </Block>
        <Block>
          <FlatList
            refreshing
            showsVerticalScrollIndicator={true}
            scrollEnabled
            scrollEventThrottle={16}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between"
            }}
            collapsable={false}
            keyExtractor={this.setKey}
            renderItem={item => this.renderStuff(item)}
            data={data}
            ListEmptyComponent={() => {
              return (
                <Block middle center>
                  <Text h2 Bold gray>
                    Nothing to See Here.
                  </Text>
                </Block>
              );
            }}
          />
        </Block>
        {this.props.playlist.index != -1 ? (
          <Block flex={false} style={{ minHeight: 85 }}>
            {this.renderControl()}
          </Block>
        ) : null}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  ball: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginHorizontal: 50,
    backgroundColor: theme.colors.gary
  },
  slider: { transform: [{ rotate: "-90deg" }] },
  thumb: {
    width: 15,
    height: 15,
    borderColor: theme.colors.black,
    backgroundColor: theme.colors.secondary,
    borderWidth: 4,
    borderRadius: 15
  },
  ball: {
    width: 16,
    height: 4,
    borderRadius: 5,
    backgroundColor: theme.colors.black,
    opacity: 0.8
  },
  flow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.gray3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },

    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 8
  },
  line: {
    backgroundColor: "gray",
    height: 4,
    width: width / 3
  },
  icons: {
    width: 25,
    height: 25
  }
});

const mapSatateToProps = state => {
  return {
    media: state.media,
    playlist: state.player
  };
};
const mapDistachToProps = dispatch => {
  return {
    newPlaylist: (playlist, navigation) =>
      dispatch(newPlaylist(playlist, navigation)),
    togglePlay: () => dispatch(togglePlay())
  };
};
export default connect(
  mapSatateToProps,
  mapDistachToProps
)(Equalizer);
