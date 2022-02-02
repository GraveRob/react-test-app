import { Dispatch } from "react"
import { socket } from "../../socket"
import { TickerAction, TickerActionTypes } from "../../types/Ticker";




export const  actionTickers = () => {
    return (dispatch: Dispatch<TickerAction>) => {
        try {
            
            dispatch({type: TickerActionTypes.FETCH_TICKERS});
            
             socket.on('ticker', (data) => {
                 dispatch({type: TickerActionTypes.FETCH_TICKERS_SUCCESS, payload: data})
             })
            
            
        } catch (error) {
            dispatch({type: TickerActionTypes.FETCH_TICKERS_ERROR, payload: 'connection error'});
        }
    }
}