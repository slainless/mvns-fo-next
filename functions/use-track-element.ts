import { DependencyList, useEffect, useMemo, useState } from 'react'
import isBrowser from './is-browser'

function handleEntries(
  observerEntries: IntersectionObserverEntry[],
  listNeverEmpty
) {
  return (oldEntries: HTMLElement[]) => {
    const newEntries = new Set(oldEntries)
    for (const entry of observerEntries) {
      const target = entry.target as HTMLElement

      const isVisible = entry.intersectionRatio > 0
      if (isVisible) {
        if (listNeverEmpty && newEntries.size === 1) {
          const exist = Array.from(newEntries)[0]
          if (exist.dataset.lastVisible != null) {
            delete exist.dataset.lastVisible
            if (exist !== target) {
              newEntries.delete(exist)
            }
          }
        }

        if (newEntries.has(target)) continue
        newEntries.add(target)
        continue
      }

      if (newEntries.has(target)) {
        if (listNeverEmpty && newEntries.size === 1) {
          target.dataset.lastVisible = ''
          continue
        }

        newEntries.delete(target)
        continue
      }
    }

    return Array.from(newEntries)
  }
}

type Options = IntersectionObserverInit & {
  margin?: string
  /** Active list will never empty; will keep the last active element in list even if it's hidden from view.
  Obviously, not ideal to be used on a single element.  */
  listNeverEmpty?: boolean
  deps?: DependencyList
}

export default function useTrackElements(
  selectorOrElements: string | HTMLElement[],
  options?: Options
) {
  const { margin, deps, listNeverEmpty, ...rest } = options ?? {}
  const dependencies = [selectorOrElements, ...(deps ?? [])]
  const [actives, setActives] = useState<HTMLElement[]>([])

  const els =
    typeof selectorOrElements == 'string'
      ? document.querySelectorAll<HTMLElement>(selectorOrElements)
      : selectorOrElements

  const observer = useMemo(
    () =>
      isBrowser
        ? new IntersectionObserver(
            (e) => {
              setActives(handleEntries(e, listNeverEmpty))
            },
            {
              rootMargin: margin,
              root: null,
              threshold: 0,
              ...rest,
            }
          )
        : null,
    dependencies
  )

  useEffect(() => {
    for (const el of els) {
      observer!.observe(el)
    }
  }, dependencies)

  return {
    actives,
    setActives,
  }
}
