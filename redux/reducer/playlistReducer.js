import * as Actions from "../action/actionTypes";
import { UpdateState } from "../../Util/util";
const InitialState = {
  loading: false,
  playlist: [],
  index: null,
  repeat: false,
  shuffle: false,
  playing: false,
  progress: null,
  Duration: null,
  resumeTime: null
};

const playlistReducer = (state = InitialState, action) => {
  console.log(action);
  switch (action.type) {
    case Actions.LOADING_PLAYLIST_START:
      return UpdateState(state, { loading: true });
      break;
    case Actions.LOADING_PLAYLIST_FINISHED:
      return UpdateState(state, { loading: false });
      break;
    case Actions.STATE:
      return UpdateState(state, { ...action.data });
      break;
    case Actions.SEEKTO:
      return UpdateState(state, action.data);
      break;
    case Actions.REPEAT_PLAYLIST:
      return UpdateState(state, action.data);
      break;
    case Actions.SHUFFLE_PLAYLIST:
      return UpdateState(state, action.data);
      break;
    case Actions.NEXT_PLAYLIST:
    case Actions.PREV_PLAYLIST:
    case Actions.TOGGLE_PLAY:
      return UpdateState(state, action.data);
      break;
    default:
      return state;
  }
};

export default playlistReducer;
