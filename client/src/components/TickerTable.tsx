import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TickerLogo from './TickerLogo';
import { useEffect, useRef, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { actionTickers } from '../store/action-creators/actionTickers';
import { useDispatch } from 'react-redux';
import { Indicator } from './Indicator';
import { getFormattedDate } from '../functions/date';
import { Alert, AlertTitle, LinearProgress, Switch } from '@mui/material';
import { socket } from '../socket';



function createData(
  ticker: string,
  exchange: string,
  price: number,
  change: number,
  change_percent: number,
  dividend: number,
  yieldTicker: number,
  last_trade_time: string
) {
  return { ticker, exchange, price, change, change_percent, dividend, yieldTicker, last_trade_time  };
}





const TickerTable: React.FC = () => {
  useEffect( () => {
    dispatch(actionTickers());
  }, []);
  
  const {loading, error, tickers} = useTypedSelector(state => state.ticker);

  const dispatch = useDispatch();

  const [checkedList, setCheckedList] = useState((new Map()));

  const disabledtickers = useRef<number[]>([]);

  const rows = tickers.map( (ticker) => createData(ticker.ticker, ticker.exchange, ticker.price, ticker.change, ticker.change_percent, ticker.dividend, ticker.yield, ticker.last_trade_time) );

  const switchHandler = (index: number,
                        event: React.ChangeEvent<HTMLInputElement>,
                        checked: Boolean) => {
                          
    const list = new Map(checkedList);
    list.set('switch-' + index, checked);

    if (checked) disabledtickers.current.push(index);
    else disabledtickers.current.splice(disabledtickers.current.indexOf(index), 1);
    socket.emit('disabled', disabledtickers.current);

    setCheckedList(list);
  }

  if (loading) return <LinearProgress  />
  if (error) return (
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    Caught an Error: <strong>{error}</strong>
  </Alert>);

  return (
    <TableContainer component={Paper} sx = {{maxWidth: 1200, minWidth: 800}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx = {{fontWeight: 'bold'}}>Ticker</TableCell>
            <TableCell align="right" sx = {{fontWeight: 'bold'}}>Exchange</TableCell>
            <TableCell align="right" sx = {{fontWeight: 'bold'}}>Price</TableCell>
            <TableCell align="right" sx = {{fontWeight: 'bold'}}>Change</TableCell>
            <TableCell align="right" sx = {{fontWeight: 'bold'}}>Change Percent</TableCell>
            <TableCell align="right" sx = {{fontWeight: 'bold'}}>Devidend</TableCell>
            <TableCell align="right" sx = {{fontWeight: 'bold'}}>Yield</TableCell>
            <TableCell align="right" sx = {{fontWeight: 'bold'}}>Last Trade</TableCell>
            <TableCell align="right" sx = {{fontWeight: 'bold'}}>Block</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.ticker ?? i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx = {{color: 'red'}}>
                <TickerLogo type = { row.ticker} />
              </TableCell>
              <TableCell align="center">{row.exchange}</TableCell>
              <TableCell align="center">
                <Indicator currentValue = {row.price} />
              </TableCell>
              <TableCell align="center">{row.change}$</TableCell>
              <TableCell align="center">{row.change_percent}%</TableCell>
              <TableCell align="center">{row.dividend}%</TableCell>
              <TableCell align="center">{row.yieldTicker}%</TableCell>
              <TableCell align="center">{getFormattedDate(new Date(row.last_trade_time))}</TableCell>
              <TableCell align="center">
                <Switch inputProps={{ 'aria-label': 'Block' }}
                        checked = {checkedList.get('switch-' + i) ?? false}
                        onChange = {(event, checked) => {switchHandler(i, event, checked)}}
                        />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TickerTable;