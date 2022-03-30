import { render, screen } from '@testing-library/react';
import EditableInput from '../EditableInput';

it('check for textinput', () => {
  render(<EditableInput />);
  const textboxElement = screen.getByRole("textbox");
  expect(textboxElement).toBeVisible();
});

it('Checks for button', () => {
    render(<EditableInput />);
    const ButtonElement = screen.getByText(/Save URL/);
    expect(ButtonElement).toBeVisible();
  });

it('gets data from endpoint', () => {

});

it('can edit url before posting', () => {
// expect(para.textContent).toBe("http://")  
// or .not.toBe()
});

it('posts data to endpoint', () => {

});