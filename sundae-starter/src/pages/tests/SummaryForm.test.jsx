import {render, screen, fireEvent} from '@testing-library/react'
import SummaryForm from '../summary/SummaryForm'
import {expect} from 'vitest'


test('checkbox flow', () => {
    // Checkbox is unchecked by default
    // render component
    render(<SummaryForm />);

    // find checkbox and button element
    const checkboxElement = screen.getByRole("checkbox", {name: /terms and conditions/i});
    const buttonElement = screen.getByRole("button", {name: /confirm/i});

    // check initial condition
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toBeDisabled();

    // Checking checkbox enables button
    // click the checkbox
    fireEvent.click(checkboxElement);
    
    // Assert if it's checked and button is enabled
    expect(checkboxElement).toBeChecked();
    expect(buttonElement).toBeEnabled();

    // Unchecking checkbox again disables button
    // click the checkbox again
    fireEvent.click(checkboxElement);

    // Assert it's unchecked and the button is disabled
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toBeDisabled();
})