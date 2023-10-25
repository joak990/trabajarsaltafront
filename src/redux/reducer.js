import { GET_ALL_POST, GET_CANDIDATES } from "./types";


const initialState = {
  jobs:[],
  candidates:[]
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POST:
        return {
          ...state,
          jobs: payload
        };
        case GET_CANDIDATES:
        return {
          ...state,
          candidates: payload
        };

    default:
      return state;
  }
};

export default rootReducer;
