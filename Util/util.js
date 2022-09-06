export const UpdateState = (state, updatedState) => {
  return {
    ...state,
    ...updatedState
  };
};

export const millTosec = mill => {
  const c = mill / 1000 / 60;
  let time = c.toFixed(2);
  return time;
};

export const secTomill = sec => {
  return sec * 1000 * 60;
};

export const milltotime = mill => {
  let s = millTosec(mill).replace(".", ":");
  if (s.substr(s.includes(":")).length < 3) s += "0";
  return s;
};
