import { ReactNode } from 'react'
import { getChildren, getChildrenByType } from 'react-nanny'
import { Slot } from '@Components/Slot'
import { isArray } from 'lodash-es'

export function getSlot<T extends string>(children: ReactNode, ...names: T[]) {
  const flatChildren = isArray(children) ? children.flat() : children
  const slots = getChildrenByType(flatChildren, [Slot])
  const filtered = getChildren(slots, (child) =>
    names.includes(child?.['props']?.name)
  )

  const result: Record<string, any> = {}
  for (const item of filtered) {
    const key = item!['props']!.name
    if (result[key] == null) result[key] = []
    result[key].push(item)
  }
  return result as Record<T, JSX.Element[]>
}
