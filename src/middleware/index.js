import { requireToken } from './requireToken.js'

const registry = {
  requireToken,
}

export function runMiddleware(to, from) {
  const names = to.meta?.middleware ?? to.middleware
  if (!names) return
  const list = Array.isArray(names) ? names : [names]
  for (const name of list) {
    const fn = registry[name]
    if (!fn) continue
    const result = fn(to, from)
    if (result != null) return result
  }
}
