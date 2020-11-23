import React, { useContext, useReducer } from "react";

const DashboardContext = React.createContext({
  displayedFeed: [],
  board: "",
  details: "",
  selectedUser: null,
});

const initialState = {
  displayedFeed: [],
  board: "rawfeed",
  details: "",
  selectedUser: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "DISPLAY_RAW_FEED":
      return {
        ...state,
        displayedFeed: payload,
      };
    case "rawfeed":
      return {
        ...state,
        board: "rawfeed",
      };
    case "ping":
      return {
        ...state,
        board: "ping",
        details: payload,
      };
    case "supportedpings":
      return {
        ...state,
        board: "supportedpings",
      };
    case "selectUser":
      return {
        ...state,
        selectedUser: payload,
      };
    case "clearUser":
      return {
        ...state,
        selectedUser: null,
      };
    default:
      return state;
  }
}

function DashboardProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <DashboardContext.Provider value={[state, dispatch]} {...props} />;
}

const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export { useDashboardContext, DashboardProvider };
