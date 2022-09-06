import { actions } from "../action/";
import { UpdateState } from "../../Util/util";

const InitialState = {
  loading: false,
  album: [],
  music: [],
  artist: [],
  playlist: [],
  progress: 0,
  error: null
};

const mediaAction = (state = InitialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case actions.LOADING_MEDIA_START:
      return UpdateState(state, {
        loading: true
      });

    case actions.LOADING_MEDIA_ALBUM:
      return UpdateState(state, {
        ...action.data,
        progress: state.progress + 25
      });
    case actions.LOADING_MEDIA_MUSIC:
      return UpdateState(state, {
        ...action.data,
        progress: state.progress + 25
      });

    case actions.LOADING_MEDIA_ARTIST:
      return UpdateState(state, {
        ...action.data,
        progress: state.progress + 25
      });

    case actions.LOADING_MEDIA_PLAYLIST:
      return UpdateState(state, {
        ...action.data,
        progress: state.progress + 25
      });

    case actions.LOADING_MEDIA_ERROR:
      return UpdateState(state, {
        error: { ...action.data },
        loading: false
      });
    case actions.LOADING_MEDIA_FINISHED:
      return UpdateState(state, { loading: false, loading: 0 });

    default:
      return state;
  }
};

export default mediaAction;
