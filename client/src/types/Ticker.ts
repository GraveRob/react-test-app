export enum TickerActionTypes {
    FETCH_TICKERS = 'FETCH_TICKERS',
    FETCH_TICKERS_SUCCESS = 'FETCH_TICKERS_SUCCESS',
    FETCH_TICKERS_ERROR = 'FETCH_TICKERS_ERROR',
}

export interface tickerGetterState {
    tickers: TickerState[];         
    loading: boolean;
    error: string | null;
}

export interface TickerState {
    ticker: string,
    exchange: string,
    price: number,
    change: number,
    change_percent: number,
    dividend: number,
    yield: number,
    last_trade_time: string,
}

interface FetchTickerAction {
    type: TickerActionTypes.FETCH_TICKERS;
}

interface FetchTickerSuccessAction {
    type: TickerActionTypes.FETCH_TICKERS_SUCCESS;
    payload: TickerState[];
}

interface FetchTickerActionError {
    type: TickerActionTypes.FETCH_TICKERS_ERROR;
    payload: string;
}

export type TickerAction = FetchTickerAction | FetchTickerSuccessAction | FetchTickerActionError;