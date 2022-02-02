import { Typography } from '@mui/material';

interface TickerLogoProps {
    type: string
}
interface CssObject {
    backgroundColor: string,
    color: string
}

const TickerLogo = ({type}: TickerLogoProps) => {
    const css: CssObject = {
        backgroundColor: 'black',
        color: 'white'
    };
    let ticketName: string = 'EMPTY';

    switch(type) {
        case 'AAPL':
            css.backgroundColor = '#fcf4e6';
            css.color = 'black';
            ticketName = 'AAPL';
            break;
        case 'GOOGL':
            css.backgroundColor = '#d9324e';
            css.color = 'white';
            ticketName = 'GOOGL';
            break;
        case 'MSFT':
            css.backgroundColor = '#3376f2';
            css.color = 'white';
            ticketName = 'MSFT';
            break;
        case 'AMZN':
            css.backgroundColor = '#6595f0';
            css.color = 'black';
            ticketName = 'AMZN';
            break;
        case 'FB':
            css.backgroundColor = '#222e5c';
            css.color = 'white';
            ticketName = 'FB';
            break;
        case 'TSLA':
            css.backgroundColor = '#fc53e9';
            css.color = 'black';
            ticketName = 'TSLA';
            break;
        default:                                  //no need in default because we have initial state of css object 
            break;
    }
    
    return (
        <Typography sx = {css} textAlign = "center" borderRadius = "3px">{ticketName}</Typography>
    );
};

export default TickerLogo;