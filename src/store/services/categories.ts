import { api } from './api'
import { buildParams } from '../../shared/lib/params'
import type { Paged, Sorting } from '../../types/api'

export type Category = { id: string; name: string; photo?: string }

export type Pagination = { pageSize?: number; pageNumber?: number }
export type DateRange = { gte?: string; lte?: string }

export type CategoryFilters = {
  name?: string;
  ids?: string[];
  pagination?: Pagination;
  createdAt?: DateRange;
  updatedAt?: DateRange;
  sorting?: Sorting;
}

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Paged<Category>, CategoryFilters | void>({
      query: (filters) => {
        const params: Record<string, string> = {}
        if (filters) {
          if (filters.name) params.name = filters.name
          if (filters.ids) params.ids = JSON.stringify(filters.ids)
          if (filters.pagination) params.pagination = JSON.stringify(filters.pagination)
          if (filters.createdAt) params.createdAt = JSON.stringify(filters.createdAt)
          if (filters.updatedAt) params.updatedAt = JSON.stringify(filters.updatedAt)
          if (filters.sorting) params.sorting = JSON.stringify(filters.sorting)
        }
        return { url: '/categories', method: 'GET', params }
      },
      providesTags: (res) =>
        res
          ? [
              ...(res.data ?? []).map((c: Category) => ({ type: 'Category' as const, id: c.id })),
              { type: 'Category' as const, id: 'LIST' },
            ]
          : [{ type: 'Category' as const, id: 'LIST' }],
    }),
    createCategory: build.mutation<Category, { name: string; photo?: string }>({
      query: (body) => ({ url: '/categories', method: 'POST', body }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }]
    }),
    updateCategory: build.mutation<Category, { id: string; name?: string; photo?: string }>({
      query: ({ id, ...rest }) => ({ url: `/categories/${id}`, method: 'PATCH', body: rest }),
      invalidatesTags: (res) => res ? [{ type: 'Category', id: res.id }] : [{ type: 'Category', id: 'LIST' }]
    }),
    deleteCategory: build.mutation<Category, string>({
      query: (id) => ({ url: `/categories/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }]
    })
  })
})

export const { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoriesApi
