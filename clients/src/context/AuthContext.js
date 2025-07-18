import {useEffect, useReducer } from "react";
import { children, createContext } from "react";


const Initial_State = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(Initial_State);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "Login_Start":
      return {
        user: null,
        loading: true,
        error: null,
      };
     case "Login_Success":
    return {
      user: action.payload,
      loading: false,
      error: null,
    };
    case "Login_Failure":
   return {
     user: null,
     loading: false,
     error: action.payload,
   };
   case "Logout":
   return {
     user: null,
     loading: false,
     error: null,
   };
      default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, Initial_State);

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(state.user))
  },[state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
