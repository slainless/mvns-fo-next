import { min } from 'class-validator'

export default class Cycler<T> {
  n: number
  length: number
  private __possibleState: T[]

  constructor(public possibleState: Set<T>, defaultState: number | T = 0) {
    this.length = possibleState.size
    this.__possibleState = Array.from(possibleState)
    this.n = min(defaultState, 0)
      ? (defaultState as number)
      : defaultState == null
      ? 0
      : Array.from(this.possibleState.values()).findIndex(
          (v) => v === (defaultState as T)
        )
  }

  next() {
    if (this.length === 1) return
    if (this.length === 2) {
      this.n === 0 ? (this.n = 1) : (this.n = 0)
      return
    }
    this.n + 1 === this.length ? (this.n = 0) : (this.n += 1)
    return
  }

  prev() {
    if (this.length === 1) return
    if (this.length === 2) {
      this.n === 0 ? (this.n = 1) : (this.n = 0)
      return
    }
    this.n - 1 === -1 ? (this.n = this.length - 1) : (this.n -= 1)
    return
  }

  get current() {
    return this.__possibleState[this.n]
  }
}
