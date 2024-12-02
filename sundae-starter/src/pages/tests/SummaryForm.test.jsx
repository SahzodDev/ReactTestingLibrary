import SummaryForm from '../summary/SummaryForm'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

test('checkbox flow', async () => {
  const user = userEvent.setup()

  // Checkbox is unchecked by default
  // render component
  render(<SummaryForm />)

  // find checkbox and button element
  const checkboxElement = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  const buttonElement = screen.getByRole('button', { name: /confirm/i })

  // check initial condition
  expect(checkboxElement).not.toBeChecked()
  expect(buttonElement).toBeDisabled()

  // Checking checkbox enables button
  // click the checkbox
  await user.click(checkboxElement)

  // Assert if it's checked and button is enabled
  expect(checkboxElement).toBeChecked()
  expect(buttonElement).toBeEnabled()

  // Unchecking checkbox again disables button
  // click the checkbox again
  await user.click(checkboxElement)

  // Assert it's unchecked and the button is disabled
  expect(checkboxElement).not.toBeChecked()
  expect(buttonElement).toBeDisabled()
})

test('popover responds to hover', async () => {
  const user = userEvent.setup()
  render(<SummaryForm />)

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  )
  expect(nullPopover).not.toBeInTheDocument()

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  await user.hover(termsAndConditions)
  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions)
  const nullPopoverAfterUnhover = screen.queryByText(
    /no ice cream will actually be delivered/i
  )
  expect(nullPopoverAfterUnhover).not.toBeInTheDocument()
})
