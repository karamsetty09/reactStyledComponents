import React from 'react';
import {render, fireEvent, waitFor, wait, cleanup, screen} from '@testing-library/react'
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

it('gets data from endpoint', async () => {
  // const axiosMock = {
  //   get: jest.fn(),
  // }
  // axiosMock.get.mockReturnValueOnce({ data: { "url" :""} })
  // const inputElement = await screen.findByTestId("submit-url-link")
  // console.log(inputElement.value);
  // render(<EditableInput/>);
});

it('should be able to edit the url before posting', () => {
  render(<EditableInput/>);
  const inputElement = screen.getByPlaceholderText(/<your app code repo link>/i)
  fireEvent.change(inputElement, { target: {value: "https://github.com/karamsetty09/vdaq/changed"} });
  expect(inputElement.value).toBe("https://github.com/karamsetty09/vdaq/changed");
});

it('posts data to endpoint', () => {
  render(<EditableInput/>);
  const inputElement = screen.getByPlaceholderText(/<your app code repo link>/i)
  const buttonElement = screen.getByRole("button")
  fireEvent.change(inputElement, { target: {value: "https://github.com/karamsetty09/vdaq/changed"} });
  fireEvent.click(buttonElement);
  expect(inputElement.value).not.toBe("https://github.com/karamsetty09/vdaq");
});