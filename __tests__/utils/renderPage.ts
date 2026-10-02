/**
 * Minimal render helpers for page components without @testing-library/dom
 * (it is not installed, so @testing-library/react cannot be used).
 */
import React, { act } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

export interface RenderedPage {
  container: HTMLDivElement
  setTaxFormUserInput: jest.Mock
  push: jest.Mock
  get: (dataTest: string) => HTMLElement | null
  click: (selector: string) => Promise<void>
  type: (dataTest: string, value: string) => Promise<void>
  /** returns values passed to the last setTaxFormUserInput call */
  lastSaved: () => TaxFormUserInput
  unmount: () => void
}

export const renderPage = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PageComponent: React.ComponentType<any>,
  taxFormUserInput: Partial<TaxFormUserInput>,
  { previousRoute = '/', nextRoute = '/next' } = {},
): Promise<RenderedPage> => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const setTaxFormUserInput = jest.fn()
  const push = jest.fn()
  let root: Root

  await act(async () => {
    root = createRoot(container)
    root.render(
      React.createElement(PageComponent, {
        taxFormUserInput,
        setTaxFormUserInput,
        router: { push },
        previousRoute,
        nextRoute,
      }),
    )
  })

  const get = (dataTest: string) =>
    container.querySelector<HTMLElement>(`[data-test="${dataTest}"]`)

  const query = (selector: string) => {
    const el =
      container.querySelector<HTMLElement>(selector) ??
      container.querySelector<HTMLElement>(`[data-test="${selector}"]`)
    if (!el) throw new Error(`Element not found: ${selector}`)
    return el
  }

  const click = async (selector: string) => {
    const el = query(selector)
    await act(async () => {
      el.click()
    })
  }

  const type = async (dataTest: string, value: string) => {
    const el = query(`[data-test="${dataTest}"]`) as HTMLInputElement
    const setter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value',
    ).set
    await act(async () => {
      setter.call(el, value)
      el.dispatchEvent(new Event('input', { bubbles: true }))
    })
  }

  const lastSaved = () => {
    const { calls } = setTaxFormUserInput.mock
    if (calls.length === 0) throw new Error('setTaxFormUserInput not called')
    return calls[calls.length - 1][0]
  }

  const unmount = () => {
    act(() => root.unmount())
    container.remove()
  }

  return {
    container,
    setTaxFormUserInput,
    push,
    get,
    click,
    type,
    lastSaved,
    unmount,
  }
}
