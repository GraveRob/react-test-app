import { TickerAction, tickerGetterState, TickerActionTypes } from "../../types/Ticker";


const initialState:tickerGetterState = {
    tickers: [],
    loading: false,
    error: null,
};



export const tickerReducer = (state = initialState, action: TickerAction): tickerGetterState => {
    switch(action.type) {
        case TickerActionTypes.FETCH_TICKERS:
            return {tickers: [], loading: true, error: null};
        case TickerActionTypes.FETCH_TICKERS_SUCCESS:
            return {tickers: action.payload, loading: false, error: null};
        case TickerActionTypes.FETCH_TICKERS_ERROR:
            return {tickers: [], loading: false, error: action.payload};
        default:
            return state;
    }
}