import { GET_ALL_POST } from "./types";


const initialState = {
  jobs:[]
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POST:
        return {
          ...state,
          jobs: payload
        };
    default:
      return state;
  }
};

export default rootReducer;
