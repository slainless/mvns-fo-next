import { ReactNode } from 'react'
import { getChildren, getChildrenByType } from 'react-nanny'
import { Slot } from '@Components/Slot'
import { isArray, partition } from 'lodash-es'

const rest = Symbol('rest')
export function getSlot<T extends string>(
  children: ReactNode,
  ...names: T[]
): Partial<Record<T | typeof rest, JSX.Element[]>> {
  if (!isArray(children))
    // @ts-expect-error
    return {
      [rest]: children,
    }
  const flatChildren = children.flat()
  const [slots, theRest] = partition(
    flatChildren,
    (child) => child?.['type'] === Slot
  )
  const filtered = getChildren(slots, (child) =>
    names.includes(child?.['props']?.name)
  )

  const result: Record<string, any> = {}
  for (const item of filtered) {
    const key = item!['props']!.name
    if (result[key] == null) result[key] = []
    result[key].push(item)
  }
  // @ts-expect-error
  result[rest] = theRest
  // @ts-expect-error
  return result
}
getSlot.rest = rest
