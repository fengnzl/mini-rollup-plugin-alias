import { type Plugin } from 'rollup'

interface AliasOptions {
  entries: Record<string, string>
}
export function alias(options: AliasOptions): Plugin {
  const { entries } = options
  return {
    name: 'alias',
    resolveId(source, importer, options) {
      const key = Object.keys(entries).find((e) => source.startsWith(e))
      if (key != null) {
        return source.replace(key, entries[key]) + '.js'
      }
      return source
    }
  }
}
