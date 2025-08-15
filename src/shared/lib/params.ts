export function buildParams(filters?: Record<string, any>) {
  const params: Record<string, string> = {}
  if (!filters) return params
  for (const [k, v] of Object.entries(filters)) {
    if (v === undefined || v === null) continue
    if (typeof v === 'object') params[k] = JSON.stringify(v)
    else params[k] = String(v)
  }
  return params
}
