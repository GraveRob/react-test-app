import  {  useRef } from 'react';

interface cssType {
    backgroundColor: string,
    color: string,
}
type IndicatorProps = {
    propValue: number;
}

export const UP_BACKGROUND_COLOR = '#7df09f';
export const UP_COLOR = '#06692f';

export const DOWN_BACKGROUND_COLOR = '#eb5777';
export const DOWN_COLOR = '#d10d37';

export const DEFAULT_BACKGROUND_COLOR = 'white';
export const DEFAULT_COLOR = 'black';

export const Indicator = ({propValue}: IndicatorProps) => {

    const value = useRef<number>(propValue);
    const css = useRef<cssType>({
        backgroundColor: DEFAULT_BACKGROUND_COLOR,
        color: DEFAULT_COLOR,
    });

    if (value.current > propValue) {
        const newCss: cssType = {
            backgroundColor: DOWN_BACKGROUND_COLOR,
            color: DOWN_COLOR
        };
        css.current = newCss;
    }
    else if ( value.current < propValue) {
        const newCss: cssType = {
            backgroundColor: UP_BACKGROUND_COLOR,
            color: UP_COLOR,
        };
        css.current = newCss;
    }

    value.current = propValue;

  return <div className = 'indicator' style = {css.current}>{propValue}</div>;
};
