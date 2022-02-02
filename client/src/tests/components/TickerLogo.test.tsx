import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import TickerLogo from "../../components/TickerLogo";

describe('<TickerLogo type: string = {yourValue} /> - returns styled fancy badge with ticker name which depends on the type', () => {
    test("TickerLogo can properly work with all existing types", () => {
        render(
            <>
                <TickerLogo type = "AAPL"/>
                <TickerLogo type = "GOOGL"/>
                <TickerLogo type = "MSFT"/>
                <TickerLogo type = "AMZN"/>
                <TickerLogo type = "FB"/>
                <TickerLogo type = "TSLA"/>
            </>
        );
       expect(screen.getByText('AAPL')).not.toBeNull();
       expect(screen.getByText('GOOGL')).not.toBeNull();
       expect(screen.getByText('MSFT')).not.toBeNull();
       expect(screen.getByText('AMZN')).not.toBeNull();
       expect(screen.getByText('FB')).not.toBeNull();
       expect(screen.getByText('TSLA')).not.toBeNull();
    });

    test("TickerLogo can properly work with uncorrect type", () => {
        render(
            <>
                <TickerLogo type = "NOTYPE"/>
            </>
        );
       expect(screen.getByText('EMPTY')).not.toBeNull();
    })
});