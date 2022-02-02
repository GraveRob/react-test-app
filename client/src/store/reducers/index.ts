import { combineReducers } from "redux";
import { tickerReducer } from "./tickerReducer";


export const rootReducer = combineReducers ( {
    ticker: tickerReducer,
})
export type RootState = ReturnType<typeof rootReducer>; 