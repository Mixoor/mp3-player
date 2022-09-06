import * as Actions from "./actionTypes";
import MediaPlayer from "../../nativeModule/MediaPlayer";

export const loadingStart = () => {
  return {
    type: Actions.LOADING_PLAYLIST_START
  };
};

export const loadingEnd = () => {
  return {
    type: Actions.LOADING_PLAYLIST_FINISHED
  };
};

export const loadState = data => {
  return {
    type: Actions.STATE,
    data
  };
};

export const toggleRepeat = () => {
  return dispatch => {
    MediaPlayer.toggleRepeat().then(r => {
      dispatch({
        type: Actions.REPEAT_PLAYLIST,
        data: { repeat: r }
      });
    });
  };
};

export const toggleShuffle = () => {
  return dispatch => {
    MediaPlayer.toggleShuffle().then(r => {
      dispatch({
        type: Actions.SHUFFLE_PLAYLIST,
        data: { shuffle: r }
      });
    });
  };
};

export const seekTo = time => {
  return dispatch => {
    MediaPlayer.seekTo(time).then(data => {
      dispatch({
        type: Actions.SEEKTO,
        data: { progress: time }
      });
    });
  };
};

export const next = () => {
  return dispatch => {
    MediaPlayer.goNext().then(data => {
      dispatch({
        type: Actions.NEXT_PLAYLIST,
        data: { index: data, progress: 0 }
      });
    });
  };
};

export const prev = () => {
  return dispatch => {
    MediaPlayer.goPrev().then(data => {
      dispatch({
        type: Actions.PREV_PLAYLIST,
        data: { index: data, progress: 0 }
      });
    });
  };
};

export const getState = () => {
  return dispatch => {
    MediaPlayer.getState()
      .then(response => JSON.parse(response))
      .then(data => dispatch(loadState(data)));
  };
};

export const togglePlaylist = () => {};

export const togglePlay = () => {
  return dispatch => {
    MediaPlayer.togglePlay().then(d =>
      dispatch({
        type: Actions.TOGGLE_PLAY,
        data: { playing: d }
      })
    );
  };
};

export const newPlaylist = (playlist, navigation) => {
  return async dispatch => {
    console.log(playlist);

    await MediaPlayer.initAudio(playlist.playlist, 0)
      .then(data => MediaPlayer.getState())
      .then(response => JSON.parse(response))
      .then(data => dispatch(loadState({ ...data, playing: true })));

    //  await navigation.navigate("Player");
  };
};
