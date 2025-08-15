import type { TFunction } from 'i18next'

type ServerFieldError = { code?: string; message?: string; field?: string }
type ServerErrorShape = {
  status?: number
  data?: { errors?: Array<{ code?: string; message?: string; fieldName?: string }> }
}

export function extractServerError(e: unknown): ServerFieldError | null {
  // RTK Query error shape
  const err = e as ServerErrorShape
  const first = err?.data?.errors?.[0]
  if (first) return { code: first.code, message: first.message, field: first.fieldName }
  return null
}

export function formatServerError(e: unknown, t: TFunction): string {
  const se = extractServerError(e)
  if (!se) return t('errors.ERR_INTERNAL_SERVER')
  const codeKey = se.code ? `errors.${se.code}` : null
  if (codeKey) {
    const tr = t(codeKey)
    if (tr && tr !== codeKey) return tr
  }
  return se.message || t('errors.ERR_INTERNAL_SERVER')
}

export function extractFieldError(e: unknown): ServerFieldError | null {
  const se = extractServerError(e)
  if (!se?.field) return null
  return se
}
