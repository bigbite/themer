import * as effects from "./effects";

const defaultState = {};

const reducer = (state = defaultState, {type, payload}) => {
  const newState = {...state};

  switch (type) {
    default:
      return newState;
  }
};

export default reducer;
