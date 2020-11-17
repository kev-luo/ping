import React, { useContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = React.createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const initialState = { user: null }

// if localstorage has a jwt token from the previous login then we set the user property of initial state to the decoded token. also check if the token has expired or not
if(localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  if(decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

function reducer(state, { type, payload }) {
  switch(type) {
    case "LOGIN":
      return {
        ...state,
        user: payload
      }
  }
}

function AuthProvider(props) {

  const [state, dispatch] = useReducer(reducer, initialState);

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({ type: "LOGIN", payload: userData })
  }

  return(
    <AuthContext.Provider 
      value={{ user: state.user, login }}
      {...props}
    />
  )
}

function useAuthContext() {
  return useContext(AuthContext);
}

export { useAuthContext, AuthProvider }