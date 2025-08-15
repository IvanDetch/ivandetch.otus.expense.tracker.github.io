import { api } from './api'
import { buildParams } from '../../shared/lib/params'
import type { Category } from './categories'
import type { Paged, Sorting } from '../../types/api'

export type OperationType = 'Profit' | 'Cost'
export type Operation = {
  id: string;
  name: string;
  desc?: string;
  amount: number;
  date: string;
  type: OperationType;
  category: Category;
  commandId: string;
}

export type Pagination = { pageSize?: number; pageNumber?: number }
export type DateRange = { gte?: string; lte?: string }

export type OperationFilters = {
  ids?: string[];
  name?: string;
  categoryIds?: string[];
  type?: OperationType;
  pagination?: Pagination;
  date?: DateRange;
  createdAt?: DateRange;
  updatedAt?: DateRange;
  sorting?: Sorting;
}

export const operationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOperations: build.query<Paged<Operation>, OperationFilters | void>({
      query: (filters) => {
        const params: Record<string, string> = {}
        if (filters) {
          if (filters.ids) params.ids = JSON.stringify(filters.ids)
          if (filters.name) params.name = filters.name
          if (filters.categoryIds) params.categoryIds = JSON.stringify(filters.categoryIds)
          if (filters.type) params.type = filters.type
          if (filters.pagination) params.pagination = JSON.stringify(filters.pagination)
          if (filters.date) params.date = JSON.stringify(filters.date)
          if (filters.createdAt) params.createdAt = JSON.stringify(filters.createdAt)
          if (filters.updatedAt) params.updatedAt = JSON.stringify(filters.updatedAt)
          if (filters.sorting) params.sorting = JSON.stringify(filters.sorting)
        }
        return { url: '/operations', method: 'GET', params }
      },
      providesTags: (res) =>
        res
          ? [
              ...(res.data ?? []).map((o: Operation) => ({ type: 'Operation' as const, id: o.id })),
              { type: 'Operation' as const, id: 'LIST' },
            ]
          : [{ type: 'Operation' as const, id: 'LIST' }],
    }),
    createOperation: build.mutation<any, { name: string; desc?: string; amount: number; date: string; type: OperationType; categoryId: string }>({
      query: (body) => ({ url: '/operations', method: 'POST', body }),
      invalidatesTags: [{ type: 'Operation', id: 'LIST' }]
    }),
    updateOperation: build.mutation<any, { id: string; name?: string; desc?: string; amount?: number; date?: string; type?: OperationType; categoryId?: string }>({
      query: ({ id, ...rest }) => ({ url: `/operations/${id}`, method: 'PATCH', body: rest }),
      invalidatesTags: (res) => res ? [{ type: 'Operation', id: res.id }] : [{ type: 'Operation', id: 'LIST' }]
    }),
    deleteOperation: build.mutation<any, string>({
      query: (id) => ({ url: `/operations/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Operation', id: 'LIST' }]
    })
  })
})

export const { useGetOperationsQuery, useCreateOperationMutation, useUpdateOperationMutation, useDeleteOperationMutation } = operationsApi
