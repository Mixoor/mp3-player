import { combineReducers } from "redux";
import { mediaReducer, playlistReducer } from "../reducer";

const root = combineReducers({
  media: mediaReducer,
  player: playlistReducer
});

export default root;
