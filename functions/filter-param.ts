import { FilterParams } from '@Methods/course'
import { CalendarDate, parseDate } from '@internationalized/date'
import Config from '@Config'
import { Category } from '@Models/category'
import { CourseQuery, CourseType } from '@Models/course'
import queryString from 'query-string'

const forceArray = (v: any): any[] =>
  v == null ? [] : !Array.isArray(v) ? [v] : v

const categoryMap: Record<string, Category> = {}
Config.categories.forEach((c) => (categoryMap[c.keyword] = c))

export function makeFilterParam(options?: FilterParams | null) {
  if (options == null) return ''
  const { category, type, price, date, popularity, rating } = options
  return (
    '?' +
    [
      ...(category?.map((v) => `category=${v.keyword}`) ?? []),
      ...(type?.map((v) => `type=${v}`) ?? []),
      ...(price ? [`price=${price[0]}|${price[1]}`] : []),
      ...(date ? [`date=${date[0].toString()}|${date[1].toString()}`] : []),
      ...(rating
        ? [`rating=${rating[0].toString()}|${rating[1].toString()}`]
        : []),
      ...(popularity?.map((v) => `popularity=${v}`) ?? []),
    ].join('&')
  )
}

export function parseFilterParam(query?: string | null) {
  if (query == null) return {}
  const parsed = queryString.parse(query)
  console.log(parsed)
  return {
    type:
      forceArray(parsed.type).filter((v) =>
        Object.values(CourseType).includes(v)
      ) ?? [],
    date:
      forceArray(parsed.date)?.[0]
        ?.split('|')
        ?.map((v) => parseDate(v)) ?? null,
    category:
      forceArray(parsed.category)
        ?.map((v) => categoryMap[v])
        .filter((v) => v != null) ?? [],
    popularity:
      forceArray(parsed.popularity)?.filter((v) =>
        Object.values(CourseQuery).includes(v)
      ) ?? [],
    price:
      forceArray(parsed.price)?.[0]
        ?.split('|')
        ?.map((v) => +v) ?? null,
    rating:
      forceArray(parsed.rating)?.[0]
        ?.split('|')
        ?.map((v) => +v) ?? null,
  }
}
