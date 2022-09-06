import { actions } from "./";
import MediaStore from "../../nativeModule/MediaStore";

export const LoadingStart = () => {
  return {
    type: actions.LOADING_MEDIA_START
  };
};

export const LoadingFinished = () => {
  return {
    type: actions.LOADING_MEDIA_FINISHED
  };
};

export const Album = data => {
  return {
    type: actions.LOADING_MEDIA_ALBUM,
    data
  };
};

export const Music = data => {
  return {
    type: actions.LOADING_MEDIA_MUSIC,
    data
  };
};

export const Artist = data => {
  return {
    type: actions.LOADING_MEDIA_ARTIST,
    data
  };
};

export const Playlist = data => {
  return {
    type: actions.LOADING_MEDIA_PLAYLIST,
    data
  };
};

export const Errors = data => {
  return {
    type: actions.LOADING_MEDIA_ERROR,
    data
  };
};

export const loadingMusic = () => {
  return dispatch => {
    dispatch(LoadingStart());
    MediaStore.getMedia()
      .then(data => {
        console.log(data);
        dispatch(Music(data));
      })
      .catch(error => {
        console.log(error);
        dispatch(Errors(error));
      });
  };
};

export const loadingPlaylist = () => {
  return dispatch => {
    dispatch(LoadingStart());
    MediaStore.getPlayList()
      .then(data => {
        console.log(data);

        dispatch(Playlist(data));
      })
      .catch(error => {
        dispatch(Errors(error));
      });
  };
};

export const loadingArtist = () => {
  return dispatch => {
    dispatch(LoadingStart());

    MediaStore.getArtist()
      .then(data => {
        console.log(data);
        dispatch(Artist(data));
      })
      .catch(error => {
        dispatch(Errors(error));
      });
  };
};

export const loadingAlbum = () => {
  return dispatch => {
    dispatch(LoadingStart());

    MediaStore.getAlbums()
      .then(data => {
        console.log(data);
        dispatch(Album(data));
      })

      .catch(error => dispatch(Errors(error)));
  };
};
