import fs from 'fs-extra'
import path from 'path'
import { type, array, string, assert, boolean, literal, number, union } from 'superstruct'
import got from 'got'
import urlJoin from 'url-join'

export async function loadCategories() {
  // const unknown = await fs.readJson(path.join(process.cwd(), '/config/categories.json'))
  const unknown = await got.get(urlJoin(process.env.NEXT_PUBLIC_API_ROOT, 'categories')).json()
  const Categories = type({
    success: boolean(),
    code: literal(200),
    message: string(),
    data: array(type({
      id: union([string(), number()]),
      keyword: string(),
      // icon: string()
    }))
  })
  assert(unknown, Categories)
  return unknown.data.map(v => ({
    ...v,
    id: v.id.toString()
  }))
}