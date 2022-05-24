import '@abraham/reflection'
import { loadCategories } from './function.js'

export default async function Startup() {
  const categories = await loadCategories()

  /** @type {MyNextConfig} */
  const config = {
    publicRuntimeConfig: {
      categories,
      debug: process.env.MODE === 'development'
    }
  }

  return config
}