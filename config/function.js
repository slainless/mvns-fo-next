import fs from 'fs-extra'
import path from 'path'
import { type, array, string, assert } from 'superstruct'

export async function loadCategories() {
  const unknown = await fs.readJson(path.join(process.cwd(), '/config/categories.json'))
  const Categories = array(type({
    id: string(),
    name: string(),
    icon: string()
  }))
  assert(unknown, Categories)
  return unknown
}