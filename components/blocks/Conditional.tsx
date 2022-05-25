import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useEffect,
  forwardRef,
  ComponentProps,
  ElementRef,
  Fragment,
} from 'react'
import { nanoid } from 'nanoid'
import { Skeleton as $Skeleton } from '@Components/Skeleton'
import { styled } from '@Theme'
import { makeDisplayName } from '@Functions/display-name'
import { ClassConstructor } from 'class-transformer'

const name = makeDisplayName('Conditional')

type Store = {
  value: any
  register: (name: string, value: any) => void
  isElse: boolean
}
const Context = createContext<Store>({
  value: undefined,
  register: () => {},
  isElse: true,
})

export function Conditional(props: { value: any; children: ReactNode }) {
  const { value, children } = props
  const [ifs, setIfs] = useState<Record<string, boolean>>({})

  const register = (name: string, result: boolean) => {
    setIfs((old) => ({
      ...old,
      [name]: result,
    }))
  }

  const isElse = useMemo(() => {
    for (const key in ifs) {
      if (ifs[key]) return false
    }
    return true
  }, [ifs, value])

  return (
    <Context.Provider
      value={{
        value,
        register,
        isElse,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export const Root = Conditional

type BaseIfProps = { children: ReactNode }
export function If(props: BaseIfProps & { fn: (v: any) => boolean })
export function If(props: BaseIfProps & { is: any })
export function If(props: BaseIfProps & { instanceof: ClassConstructor<any> })
export function If(
  props: BaseIfProps & { notInstanceof: ClassConstructor<any> }
)
export function If(
  props: BaseIfProps & {
    fn?: (v: any) => boolean
    is?: any
    instanceof?: ClassConstructor<any>
    notInstanceof?: ClassConstructor<any>
  }
) {
  const id = useMemo(() => nanoid(), [])
  const { fn, is, instanceof: $instanceof, notInstanceof, children } = props
  const { value, register } = useContext(Context)
  const result = useMemo(() => {
    if ('fn' in props) return !!fn?.(value)
    if ('is' in props) return is === value
    if ('instanceof' in props) return value instanceof $instanceof!
    if ('notInstanceof' in props) return !(value instanceof notInstanceof!)
  }, [is, fn, $instanceof, notInstanceof, value])

  useEffect(() => {
    register(id, result)
  }, [result])

  if (result) return <>{children}</>
  return null
}

export function Else(props: { children: ReactNode }) {
  const { children } = props
  const { isElse } = useContext(Context)

  if (isElse) return <>{children}</>
  return null
}

const StyledDiv = styled('div')
export const _Skeleton = forwardRef<
  ElementRef<typeof StyledDiv>,
  ComponentProps<typeof StyledDiv> & { when?: any }
>((props, ref) => {
  const { when: $when = true, children, ...rest } = props

  if ($when) return <StyledDiv key="skeleton" {...rest} ref={ref} />
  return <Fragment key="children">{children}</Fragment>
})
_Skeleton.displayName = name('Skeleton')
const StyledSkeleton = styled(_Skeleton, $Skeleton)
export const Skeleton = StyledSkeleton
