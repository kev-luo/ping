import React, { useContext, useReducer } from 'react';

const DashboardContext = React.createContext({
  board: "",
  details: "",
  selectedUser: null,
});

const initialState = { 
  board: "rawfeed",
  details: '',
  selectedUser: null,
}

function reducer(state, action) {
  switch (action.type) {
    case "rawfeed":
      return {
        ...state,
        board: "rawfeed",
        details: ""
      }
    case "ping":
      return {
        ...state,
        board: "ping",
        details: action.pingId
      }
    case "supportedpings":
      return {
        ...state,
        board: "supportedpings"
      }
    default: 
      return state;
  }
}

function DashboardProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <DashboardContext.Provider
      value={[state, dispatch]}
      {...props}
    />
  )
}

const useDashboardContext = () => {
  return useContext(DashboardContext);
}

export { useDashboardContext, DashboardProvider }