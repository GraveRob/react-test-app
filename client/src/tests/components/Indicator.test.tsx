import { render } from "@testing-library/react";
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_COLOR, DOWN_BACKGROUND_COLOR, DOWN_COLOR, Indicator, UP_BACKGROUND_COLOR, UP_COLOR } from "../../components/Indicator";
import "@testing-library/jest-dom/extend-expect";

describe('<Indicator propValue: number = {yourValue} /> - Adding light which depends on the changing of currentValue', () => {
    test('Indicator has only 1 class', () => {
        const { container } = render(<Indicator propValue={100} />);
        expect(container.getElementsByClassName('indicator').length).toBe(1);
    });
    
    test('Indicator value setting from props', () => {
        const { container } = render(<Indicator propValue={100} />);
        expect(container.getElementsByClassName('indicator')[0]).toHaveTextContent('100');
    });

    test('Indicator after mounting has default case style', () => {
        const { container } = render(<Indicator propValue={100} />);
        expect(container.getElementsByClassName('indicator')[0]).toHaveStyle(
            `background-color: ${DEFAULT_BACKGROUND_COLOR};
             color: ${DEFAULT_COLOR};`
        );
    });

    test('Indicator value can be changed', () => {
        const { container, rerender } = render(<Indicator propValue={100} />);
        rerender(<Indicator propValue={200} />);
        expect(container.getElementsByClassName('indicator')[0]).toHaveTextContent('200');
    });

    test('Indicator can properly indicate receiving bigger values (style changing)', () => {
        const { container, rerender } = render(<Indicator propValue={100} />);
        rerender(<Indicator propValue={200} />);
        expect(container.getElementsByClassName('indicator')[0]).toHaveStyle(
            `background-color: ${UP_BACKGROUND_COLOR};
             color: ${UP_COLOR};`
    );
    });

    test('Indicator can properly indicate receiving lower values (style changing)', () => {
        const { container, rerender } = render(<Indicator propValue={100} />);
        rerender(<Indicator propValue={50} />);
        expect(container.getElementsByClassName('indicator')[0]).toHaveStyle(
            `background-color: ${DOWN_BACKGROUND_COLOR};
             color: ${DOWN_COLOR};`
    );
    });

    test('Indicator can properly indicate receiving lower values (style changing)', () => {
        const { container, rerender } = render(<Indicator propValue={100} />);
        rerender(<Indicator propValue={50} />);
        expect(container.getElementsByClassName('indicator')[0]).toHaveStyle(
            `background-color: ${DOWN_BACKGROUND_COLOR};
             color: ${DOWN_COLOR};`
    );
    });

    test('Indicator can properly indicate updates with old data', () => {
        const { container, rerender } = render(<Indicator propValue={100} />);
        rerender(<Indicator propValue={50} />);
        rerender(<Indicator propValue={50} />);
        expect(container.getElementsByClassName('indicator')[0]).toHaveStyle(
            `background-color: ${DOWN_BACKGROUND_COLOR};
             color: ${DOWN_COLOR};`
    );
    });
});