import { GetStaticProps } from 'next'
import { PathLike, readFile } from 'fs-extra'

type TaskType<T> = (...args: Parameters<GetStaticProps<T>>) => Promise<T>
export function StaticTasks<T extends { [k: string]: any }>(
  tasks: Record<keyof T, TaskType<T[keyof T]>>
): GetStaticProps<T> {
  return async (context) => {
    const props: Partial<T> = {}
    const entries = Object.entries(tasks)
    const results = await Promise.all(entries.map((e) => e[1](context)))

    for (const i in results) {
      const key = entries[i][0] as keyof T
      const result = results[i]

      props[key] = result
    }

    return {
      props: props as T,
    }
  }
}

export module Task {
  export function readTextFile(
    file: PathLike | number,
    encoding?: BufferEncoding | ({} & string),
    flag?: string
  ): TaskType<string> {
    return async (context) => {
      const loadedFile = await readFile(file, {
        encoding: encoding ?? 'utf-8',
        flag,
      })
      return loadedFile
    }
  }
}
