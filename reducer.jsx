import {createReducer} from "@reduxjs/toolkit";

export const rootReducer = createReducer(
    {isAuthenticated:false},
    {
        login: (state) => {
            state.isAuthenticated = true;
        }
        , 
        logOut: (state)=> {
          state.isAuthenticated = false;
        }
    }
)
