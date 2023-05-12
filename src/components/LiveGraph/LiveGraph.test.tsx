import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import LiveGraph from './LiveGraph';

test("renders LiveGraph component", () => {
    const {container} = render(<LiveGraph />);
});

test("Renders LiveGraph value titles", () => {
    const {container} = render(<LiveGraph />);

    const tempText = screen.getByText("temp");
    const humidityText = screen.getByText("humidity");
    const co2Text = screen.getByText("co2");
});

