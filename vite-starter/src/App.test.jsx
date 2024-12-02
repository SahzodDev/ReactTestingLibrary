import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { expect } from 'vitest'
import { kebabCaseToTitleCase } from './helpers'

test('button click flow', () => {
  // render App
  render(<App />)

  // find the button
  const buttonElement = screen.getByRole('button', { name: /blue/i })

  // check initial color
  expect(buttonElement).toHaveClass('medium-violet-red')

  // click the button
  fireEvent.click(buttonElement)

  // check the button text
  expect(buttonElement).toHaveTextContent(/red/i)

  // check the button color
  expect(buttonElement).toHaveClass('midnight-blue')
})

test('checkbox flow', () => {
  render(<App />)

  // find elements
  const buttonElement = screen.getByRole('button', { name: /blue/i })
  const checkboxElement = screen.getByRole('checkbox', {
    name: /disable button/i,
  })

  // check initial conditions
  expect(buttonElement).toBeEnabled()
  expect(checkboxElement).not.toBeChecked()

  // click the checkbox disable button
  fireEvent.click(checkboxElement)

  // assert if the button is disabled and if it's color is turned gray
  expect(buttonElement).not.toBeEnabled()
  expect(buttonElement).toHaveClass('disabled')

  // click the checkbox again to re-enable button
  fireEvent.click(checkboxElement)

  // assert if the button is enabled
  expect(buttonElement).toBeEnabled()
  expect(buttonElement).toHaveClass('medium-violet-red')
})

test('checkbox flow after button click', () => {
  render(<App />)

  // find elements
  const buttonElement = screen.getByRole('button', { name: /blue/i })
  const checkboxElement = screen.getByRole('checkbox', {
    name: /disable button/i,
  })

  // check initial conditions
  expect(buttonElement).toBeEnabled()
  expect(checkboxElement).not.toBeChecked()

  // click the button and checkbox
  fireEvent.click(buttonElement)
  fireEvent.click(checkboxElement)

  // assert if the button is disabled and if it's color is turned gray
  expect(buttonElement).not.toBeEnabled()
  expect(buttonElement).toHaveClass('disabled')

  // click the checkbox again to re-enable button
  fireEvent.click(checkboxElement)

  // assert if the button is enabled
  expect(buttonElement).toBeEnabled()
  expect(buttonElement).toHaveClass('midnight-blue')
})

describe('kebabCaseToTitleCase', () => {
  test('Works for no hyphens', () => {
    expect(kebabCaseToTitleCase('red')).toBe('Red')
  })
  test('Works for one hyphens', () => {
    expect(kebabCaseToTitleCase('midnight-blue')).toBe('Midnight Blue')
  })
  test('Works for multiple hyphens', () => {
    expect(kebabCaseToTitleCase('medium-violet-red')).toBe('Medium Violet Red')
  })
})
