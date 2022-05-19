import { Components } from 'react-markdown'
import { createElement } from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import { getChildByType, removeChildrenByType } from 'react-nanny'
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@Components/Accordion'
import { ComponentType, ReactElement, ReactNode } from 'react'
import { nanoid } from 'nanoid'
import { Text } from '@Components/Text'
import { merge, kebabCase } from 'lodash-es'
import { Card } from '@Components/Card'
import { Button } from '@Components/Button'
import { Link, NextLink } from '@Components/Link'
import { omit, pick, transform, curryRight } from 'lodash-es'
import PropertyProcessor, { Processor } from './directive-processor'

export const processProps = (
  props: ReactMarkdownProps & Record<string, any>
) => {
  const cleanProps = omit(props, [
    'as',
    'node',
    'index',
    'siblingCounts',
    'sourcePosition',
  ])

  const propsProcessor = new PropertyProcessor([Processor.toJSON], cleanProps)
  propsProcessor.run()
  return propsProcessor.result
}

const getTag = (p: ReactMarkdownProps) => p.node.tagName
type RawComponent = ComponentType<ReactMarkdownProps & Record<string, any>>
export type ConversionType<
  T,
  PropIsOptional = true
> = PropIsOptional extends true
  ? (componentProps?: T) => RawComponent
  : (componentProps: T) => RawComponent

export const toAccordionItem: ConversionType<any> =
  (accordionProps) => (props) => {
    const summary = getChildByType(props.children, ['summary']) as ReactNode
    const rest = removeChildrenByType(props.children, ['summary'])
    const title = summary?.['props']?.children.toString() ?? nanoid(10)
    return (
      <AccordionItem value={kebabCase(title)}>
        <AccordionTrigger>
          <Text>{title}</Text>
        </AccordionTrigger>
        <AccordionContent>{rest}</AccordionContent>
      </AccordionItem>
    )
  }

export const toAccordionRoot: ConversionType<
  Partial<ReactProps<typeof Accordion>>
> = (accordionProps) => (props) => {
  return (
    <Accordion
      data-type="accordion"
      {...merge({ type: 'single' }, accordionProps)}
      {...processProps(props)}
    />
  )
}

export const toCard: ConversionType<ReactProps<typeof Card>> =
  (cardProps) => (props) => {
    return <Card {...cardProps} {...processProps(props)} />
  }

export const toLink: ConversionType<ReactProps<typeof Link>> =
  (linkProps) => (props) => {
    return <Link {...linkProps} {...processProps(props)} />
  }

export const toNextLink: ConversionType<ReactProps<typeof NextLink>> =
  (linkProps) => (props) => {
    const mergedProps = { ...linkProps, ...processProps(props) }
    if (mergedProps['href'] == null)
      return <Link {...(mergedProps as ReactProps<typeof Link>)} />
    return <NextLink {...(mergedProps as ReactProps<typeof NextLink>)} />
  }

export const toButton: ConversionType<ReactProps<typeof Button>> =
  (buttonProps) => (props) => {
    return <Button {...buttonProps} {...processProps(props)} />
  }

type BaseDict = Record<string, ConversionType<any>>
const tagDictionary = {
  'x-accordion': toAccordionRoot,
  'x-accordion-root': toAccordionRoot,
  'x-accordion-item': toAccordionItem,
  'x-card': toCard,
  'x-link': toLink,
  'x-next-link': toNextLink,
  'x-button': toButton,
} as const
type TagDictionary = typeof tagDictionary

export function makeTagDict<
  WatchAs extends keyof ReactHTML,
  ExtensionDict extends BaseDict = {}
>(
  tags?: {
    watchAsFrom?: WatchAs[]
    extend?: ExtensionDict
  },
  initialProps?: {
    [k in keyof TagDictionary | keyof ExtensionDict]: Parameters<
      (TagDictionary & ExtensionDict)[k]
    >[0]
  }
): Record<WatchAs & keyof TagDictionary & keyof ExtensionDict, RawComponent> {
  const mergedDict = {
    ...tagDictionary,
    ...(tags?.extend ?? {}),
  }
  const applyTarget = [...(tags?.watchAsFrom ?? []), ...Object.keys(mergedDict)]

  const checkElement: RawComponent = (props) => {
    const type = props['as']
    const tag = getTag(props)

    let fallbackToTag = false

    for (const key in mergedDict) {
      if (type === key) return mergedDict[key](initialProps?.[key])(props)
      if (tag === key) fallbackToTag = true
    }
    if (fallbackToTag) return mergedDict[tag](initialProps?.[tag])(props)

    return createElement(tag, props)
  }

  const result = transform(
    applyTarget,
    (r, v, k) => {
      r[v] = checkElement
    },
    {}
  ) as Record<
    WatchAs & keyof TagDictionary & keyof ExtensionDict,
    typeof checkElement
  >
  return result
}
