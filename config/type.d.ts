declare type MyNextConfig = import('next').NextConfig & {
  publicRuntimeConfig: {
    categories: import('@Models/category').Category[]
  }
}
