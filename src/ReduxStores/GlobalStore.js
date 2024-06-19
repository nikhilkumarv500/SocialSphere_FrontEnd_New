import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './GlobalReducers'; 

export const globalStore = configureStore({
    reducer: {
        GlobalState: globalReducer
    },
});
