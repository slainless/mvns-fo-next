import { kebabCase } from 'lodash-es'
import isBrowser from './is-browser'

export module generateId {
  export function fromContent(e: HTMLElement) {
    e.id = kebabCase(e.textContent ?? '')
  }
}

export const getDocumentStyle = (prop: keyof CSSStyleDeclaration) =>
  isBrowser ? getComputedStyle(document.documentElement)[prop] : null
