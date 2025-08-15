import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function extractServerError(error: unknown): { code?: string; message?: string } | null {
  const e = error as FetchBaseQueryError & { data?: any }
  const data: any = (e && 'data' in e) ? (e as any).data : null
  const first = data?.errors?.[0] ?? null
  return first ? { code: first.code, message: first.message } : (data?.error ? { message: data.error } : null)
}

export function extractFieldError(e: any): { field?: string; message?: string } | null {
  const err = e?.data?.errors?.[0]
  if (!err) return null
  const field = err?.fieldName
  const message = err?.message
  return { field, message }
}
