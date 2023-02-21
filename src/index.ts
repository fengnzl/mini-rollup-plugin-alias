import { type Plugin } from 'rollup'

interface AliasOptions {
  entries:
    | Record<string, string>
    | Array<{ find: string | RegExp; replacement: string }>
}
export function alias(options: AliasOptions): Plugin {
  const entries = normalizeEntries(options.entries)
  return {
    name: 'alias',
    resolveId(source, importer, options) {
      const matched = entries.find((entrie) => entrie.match(source))
      if (matched != null) {
        return matched.replace(source)
      }
      return source
    }
  }
}

function normalizeEntries(entries: AliasOptions['entries']): Entry[] {
  if (Array.isArray(entries)) {
    return entries.map((e) => new Entry(e.find, e.replacement))
  } else {
    return Object.keys(entries).map((key) => new Entry(key, entries[key]))
  }
}

class Entry {
  constructor(
    private readonly find: string | RegExp,
    private readonly replacement: string
  ) {}

  match(filePath: string): boolean {
    if (typeof this.find === 'string') {
      return filePath.startsWith(this.find)
    } else {
      return this.find.test(filePath)
    }
  }

  replace(filePath: string): string {
    return filePath.replace(this.find, this.replacement) + '.js'
  }
}
