import React, { useContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = React.createContext;

function AuthProvider(props) {


  return(
    <AuthContext.Provider 

      {...props}
    />
  )
}

function useAuthContext() {
  return useContext(AuthContext);
}

export { useAuthContext, AuthProvider }