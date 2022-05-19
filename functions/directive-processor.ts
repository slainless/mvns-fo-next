import { transform, assign, mapKeys } from 'lodash-es'

type Hook = (params: {
  readonly directives: string[]
  readonly key: string
  readonly originalValue: any
  currentValue: any
  readonly originalProps: Record<string, any>
  currentProps: Record<string, any>
  mutateProps: (props: Record<string, any>) => void
  mutateValue: (newValue: any) => void
}) => any

type Setup = {
  onStart: (h: Hook) => void
  onMain: (h: Hook) => void
  onEnd: (h: Hook) => void
}
export type ProcessorType<T extends string = any> = {
  name: T
  setup: (hooks: Setup) => void
}
type PropertyContext = {
  props: Record<string, any>
  currentProps: Record<string, any>
  mutateProps: (props: Record<string, any>) => void
}

class DirectiveProcessor {
  private startHooks: Hook[] = []
  private mainHooks: Hook[] = []
  private endHooks: Hook[] = []

  private currentValue: any
  directives: string[]
  fullKey: string
  key: string

  constructor(
    private propertyContext: PropertyContext,
    processors: ProcessorType[],
    key: string,
    private readonly value: any
  ) {
    this.fullKey = key
    this.currentValue = value
    const splitted = key.split(':')
    this.directives = splitted
    this.key = splitted.pop()!
    const order = transform(
      splitted,
      (r, v, k) => {
        r[v] = k
      },
      {}
    ) as Record<string, number>

    const getPriority = (high: number, low: number) =>
      Number.parseInt(
        high.toString(2).padStart(8, '0') + low.toString(2).padStart(8, '0')
      )
    const processorUsed = processors
      .filter((p) => this.directives.includes(p.name))
      .map((p, i) => [i, p] as const)
      .sort(
        (a, b) =>
          getPriority(order[a[1].name], a[0]) -
          getPriority(order[b[1].name], b[0])
      )
      .map((v) => v[1])

    for (const processor of processorUsed) {
      if (this.directives.includes(processor.name))
        processor.setup({
          onStart: (hook: Hook) => this.startHooks.push(hook),
          onMain: (hook: Hook) => this.mainHooks.push(hook),
          onEnd: (hook: Hook) => this.endHooks.push(hook),
        })
    }
  }

  mutateValue(newValue: any) {
    this.propertyContext.mutateProps({
      [this.fullKey]: newValue,
    })
  }

  start() {
    for (const hook of this.startHooks) {
      hook({
        directives: this.directives,
        key: this.key,
        originalValue: this.value,
        currentValue: this.currentValue,
        originalProps: this.propertyContext.props,
        currentProps: this.propertyContext.currentProps,

        mutateProps: this.propertyContext.mutateProps,
        mutateValue: this.mutateValue.bind(this),
      })
    }
  }

  end() {
    for (const hook of this.endHooks) {
      hook({
        directives: this.directives,
        key: this.key,
        originalValue: this.value,
        currentValue: this.currentValue,
        originalProps: this.propertyContext.props,
        currentProps: this.propertyContext.currentProps,
        mutateProps: this.propertyContext.mutateProps,
        mutateValue: this.mutateValue.bind(this),
      })
    }
  }

  main() {
    for (const hook of this.mainHooks) {
      hook({
        directives: this.directives,
        key: this.key,
        originalValue: this.value,
        currentValue: this.currentValue,
        originalProps: this.propertyContext.props,
        currentProps: this.propertyContext.currentProps,
        mutateProps: this.propertyContext.mutateProps,
        mutateValue: this.mutateValue.bind(this),
      })
    }
  }
}

export default class PropertyProcessor {
  private runned = false
  private finalProps: Record<string, any>
  private directiveProcessors: DirectiveProcessor[] = []

  get context(): PropertyContext {
    return {
      props: this.props,
      currentProps: this.finalProps,
      mutateProps: this.mutateProps.bind(this),
    }
  }

  get result() {
    if (this.runned == false) throw new Error('Run the processor first')
    return this.finalProps
  }

  mutateProps(mutation: Record<string, any>) {
    assign(this.finalProps, mutation)
  }

  constructor(processors: ProcessorType[], private props: Record<string, any>) {
    this.finalProps = props
    for (const key in props) {
      const value = props[key]
      this.directiveProcessors.push(
        new DirectiveProcessor(this.context, processors, key, value)
      )
    }
  }

  run() {
    if (this.runned) throw new Error('Should be ran once!')
    this.runned = true
    for (const processor of this.directiveProcessors) {
      processor.start()
    }

    for (const processor of this.directiveProcessors) {
      processor.main()
    }

    for (const processor of this.directiveProcessors) {
      processor.end()
    }
    const withDirectives = this.directiveProcessors.filter(
      (p) => p.directives.length > 0
    )
    for (const p of withDirectives) {
      const { fullKey, key } = p
      const finalValue = this.finalProps[fullKey]
      delete this.finalProps[fullKey]
      this.finalProps[key] = finalValue
    }
    return this.finalProps
  }
}

export module Processor {
  const makeProcessor = <T extends string>(
    name: T,
    setup: (h: Setup) => void
  ): ProcessorType<T> => ({
    name,
    setup,
  })

  export const toJSON = makeProcessor('json', ({ onMain }) => {
    onMain(({ mutateValue, currentValue }) =>
      mutateValue(JSON.parse(currentValue))
    )
  })
}
