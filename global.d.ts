declare type ReactHTML = import('react').ReactHTML
declare type HTMLAttributes<T> = import('react').HTMLAttributes<T>
declare type HTMLAttr<T extends keyof ReactHTML> = Parameters<ReactHTML[T]>[0] &
  HTMLAttributes<HTMLElement>

import 'react'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}
