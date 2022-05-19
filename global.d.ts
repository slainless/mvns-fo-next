declare type ReactHTML = import('react').ReactHTML
declare type HTMLAttributes<T> = import('react').HTMLAttributes<T>
declare type HTMLAttr<T extends keyof ReactHTML> = Parameters<ReactHTML[T]>[0] &
  HTMLAttributes<HTMLElement>
declare type ReactProps<T> = Parameters<T>[0]

type Undefinable<T> = Extract<T, undefined> extends never ? false : true
