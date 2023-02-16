import { type Plugin } from 'rollup'

interface AliasOptions {
  entries: Record<string, string>
}
export function alias(options: AliasOptions): Plugin {
  const { entries } = options
  return {
    name: 'alias',
    resolveId(source, importer, options) {
      console.log(entries)
      return source
    }
  }
}
